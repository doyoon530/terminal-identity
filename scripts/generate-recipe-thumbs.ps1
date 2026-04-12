param(
  [string]$SourceDir = "C:\Users\kimdu\OneDrive\문서\GitHub\terminal-identity\assets\recipes",
  [string]$ThumbDir = "C:\Users\kimdu\OneDrive\문서\GitHub\terminal-identity\assets\recipes\thumbs",
  [int]$ThumbWidth = 560
)

$edgePath = if (Test-Path "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe") {
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
} elseif (Test-Path "C:\Program Files\Microsoft\Edge\Application\msedge.exe") {
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
} else {
  throw "Microsoft Edge not found."
}

Add-Type -AssemblyName System.Drawing

$backgroundHex = "#17120f"
$backgroundColor = [System.Drawing.ColorTranslator]::FromHtml($backgroundHex)
$tempDir = Join-Path $env:TEMP "terminal-identity-thumb-build"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
New-Item -ItemType Directory -Force -Path $ThumbDir | Out-Null

function Get-CardDimensions([string]$SvgPath) {
  $firstLine = Get-Content -LiteralPath $SvgPath -TotalCount 1
  if ($firstLine -match 'width="(?<width>\d+)" height="(?<height>\d+)"') {
    return @{
      Width = [int]$matches.width
      Height = [int]$matches.height
    }
  }

  throw "Could not read width/height from $SvgPath"
}

function Get-NonBackgroundBounds([System.Drawing.Bitmap]$Bitmap, [System.Drawing.Color]$BgColor) {
  $minX = $Bitmap.Width
  $minY = $Bitmap.Height
  $maxX = -1
  $maxY = -1

  for ($y = 0; $y -lt $Bitmap.Height; $y += 1) {
    for ($x = 0; $x -lt $Bitmap.Width; $x += 1) {
      $pixel = $Bitmap.GetPixel($x, $y)
      if ($pixel.ToArgb() -ne $BgColor.ToArgb()) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  if ($maxX -lt $minX -or $maxY -lt $minY) {
    throw "Could not detect card bounds."
  }

  return [System.Drawing.Rectangle]::FromLTRB($minX, $minY, $maxX + 1, $maxY + 1)
}

function Save-ResizedPng([System.Drawing.Bitmap]$Source, [string]$OutputPath, [int]$OutputWidth) {
  $outputHeight = [int][Math]::Round($Source.Height * ($OutputWidth / [double]$Source.Width))
  $resized = New-Object System.Drawing.Bitmap($OutputWidth, $outputHeight)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($resized)
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.DrawImage($Source, 0, 0, $OutputWidth, $outputHeight)
    } finally {
      $graphics.Dispose()
    }

    $resized.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $resized.Dispose()
  }
}

Get-ChildItem -LiteralPath $SourceDir -Filter *.svg | ForEach-Object {
  $svgPath = $_.FullName
  $slug = $_.BaseName
  $card = Get-CardDimensions $svgPath
  $tempHtmlPath = Join-Path $tempDir "$slug.html"
  $tempPngPath = Join-Path $tempDir "$slug.png"
  $outputPath = Join-Path $ThumbDir "$slug.png"
  $svgUri = (New-Object System.Uri($svgPath)).AbsoluteUri
  $wrapper = @"
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      background: $backgroundHex;
      overflow: hidden;
    }
    img {
      display: block;
      width: 100vw;
      height: 100vh;
      object-fit: contain;
    }
  </style>
</head>
<body>
  <img src="$svgUri" alt="$slug thumbnail" />
</body>
</html>
"@
  Set-Content -LiteralPath $tempHtmlPath -Value $wrapper -Encoding UTF8
  if (Test-Path $tempPngPath) {
    Remove-Item -LiteralPath $tempPngPath -Force
  }

  $htmlUri = (New-Object System.Uri($tempHtmlPath)).AbsoluteUri
  & $edgePath --headless=new --disable-gpu --hide-scrollbars --window-size=$($card.Width),$($card.Height) --screenshot="$tempPngPath" "$htmlUri" | Out-Null

  $deadline = [DateTime]::UtcNow.AddSeconds(10)
  while (!(Test-Path $tempPngPath) -and [DateTime]::UtcNow -lt $deadline) {
    Start-Sleep -Milliseconds 100
  }
  if (!(Test-Path $tempPngPath)) {
    throw "Thumbnail screenshot failed for $slug"
  }

  $bitmap = [System.Drawing.Bitmap]::FromFile($tempPngPath)
  try {
    $bounds = Get-NonBackgroundBounds $bitmap $backgroundColor
    $cropped = $bitmap.Clone($bounds, $bitmap.PixelFormat)
    try {
      Save-ResizedPng $cropped $outputPath $ThumbWidth
    } finally {
      $cropped.Dispose()
    }
  } finally {
    $bitmap.Dispose()
  }

  Write-Output "Generated $outputPath"
}
