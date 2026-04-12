(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityLayouts = root.TerminalIdentityLayouts || {};
  root.TerminalIdentityLayouts.buildAmberDashboard = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  return function buildAmberDashboard(state, palette, provider, topLangs, contributions, surfaces, helpers) {
    const {
      ICON_SIZES,
      STAT_KEYS,
      buildCircularProfileSlot,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildProfileClipPath,
      buildStatBars,
      escapeXml,
      estimateContributionSectionHeight,
      getAmberContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getStatusText,
      renderBoldLine,
      safeSvgId,
      shouldRenderLangIcons,
      truncateText,
      truncateTextPx,
      wrapTextBlock,
    } = helpers;

    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;
    const contentY = outerY + 36;
    const accent = surfaces.accent;
    const dim = surfaces.textMuted;
    const label = surfaces.label;

    const leftX = 54;
    const leftW = Math.min(380, Math.round(outerW * 0.42));
    const leftH = Math.max(footerY - contentY - 8, 0);
    const rightX = leftX + leftW + 18;
    const rightW = Math.max(state.width - rightX - 54, 0);
    const rightY = contentY;

    const showProfileFrame = !state.hideProfile;
    const hasProfileImage = !!state.profileUri;
    const profileR = 32;
    const profileCx = leftX + 20 + profileR;
    const profileCy = contentY + 54;
    const dividerY = profileCy + profileR + 14;
    const aboutLabelY = dividerY + 14;
    const roleY = showProfileFrame ? aboutLabelY + 24 : contentY + 44;
    const bioTopY = roleY + 26;

    const bioSource = state.bio || state.tagline;
    const bioLineH = 17;
    const bioMaxLines = Math.max(1, Math.floor((leftH - (roleY - contentY) - 26 - 10) / bioLineH));
    const bioTextW = Math.max(40, leftW - 40);
    const bioLines = wrapTextBlock(bioSource, bioTextW, bioMaxLines, { fontSize: 12 });

    const showLeftPanelBio = bioLines.length > 0 && leftH >= (roleY - contentY + bioLineH + 10);
    const leftClipId = safeSvgId("amber-left-clip", `${state.provider}-${state.theme}-${state.username || state.name}`);
    const profileClipId = safeSvgId("profile-clip", state.username || state.name);
    const profileTextX = profileCx + profileR + 16;
    const profileTextW = Math.max(40, leftX + leftW - 20 - profileTextX);
    const roleTextW = Math.max(40, leftW - 54);

    const rightPanelDataTop = rightY + 16;
    const rightPanelDataBottom = Math.max(footerY - 12, rightPanelDataTop);
    const statKeys = state.stats || STAT_KEYS;
    const statsH = statKeys.length * 18;
    const showStats = state.githubStats && (rightPanelDataBottom - rightPanelDataTop) >= statsH + 16;
    const statsLabelY = rightPanelDataTop + 13;
    const statsY = rightPanelDataTop + 24;
    const statsEndY = showStats ? statsY + statsH : rightPanelDataTop;

    const rightPanelModuleTop = statsEndY + 18;
    const moduleGap = 14;
    const hasContribs = contributions && showStats;
    const hasLangs = topLangs && showStats;
    const moduleAvail = rightPanelDataBottom - rightPanelModuleTop;
    const maxBarLangs = topLangs
      ? Math.min(topLangs.length, Math.max(0, Math.floor(Math.max(0, moduleAvail - 30) / 18)))
      : 0;
    const langCount = shouldRenderLangIcons(state)
      ? getLangDisplayCount(state, topLangs, { maxIcons: 4 })
      : maxBarLangs;
    const langModuleH = getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 });
    const canShowLangsFirst = hasLangs && langCount > 0 && moduleAvail >= langModuleH;
    const preliminaryLangsToShow = canShowLangsFirst ? topLangs.slice(0, langCount) : null;
    const langContentH = !canShowLangsFirst
      ? 0
      : shouldRenderLangIcons(state)
        ? (ICON_SIZES[state.iconSize] ?? ICON_SIZES.md)
        : preliminaryLangsToShow.length * 18;
    const langModuleTotalH = canShowLangsFirst ? langContentH + 30 : 0;

    const contribModuleTop = rightPanelModuleTop + (canShowLangsFirst ? langModuleTotalH + moduleGap : 0);
    const contribAvailH = rightPanelDataBottom - contribModuleTop - 4;
    const amberContribOptions = getAmberContributionOptions(state, {
      labelColor: label,
    });
    const contribSectionH = estimateContributionSectionHeight(
      contributions,
      rightW - 36,
      state.contribTheme,
      amberContribOptions
    );
    const canShowContribs = hasContribs && contribAvailH >= contribSectionH;
    const langModuleTop = rightPanelModuleTop;
    const showLangs = canShowLangsFirst;
    const langsToShow = showLangs ? topLangs.slice(0, langCount) : null;
    const langsLabelY = langModuleTop + 11;
    const langsY = langModuleTop + 22;
    const contribDividerY = contribModuleTop - 2;
    const contribGridY = contribModuleTop + amberContribOptions.contentTop;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="${surfaces.bodyFill}"></rect>
  <rect x="${outerX + 0.5}" y="${outerY + 0.5}" width="${outerW - 1}" height="${outerH - 1}" rx="13.5" stroke="${surfaces.panelStroke}"></rect>

  <rect x="${leftX}" y="${contentY}" width="${leftW}" height="${leftH}" rx="10" fill="${surfaces.panelFill}"></rect>
  <defs>
    <clipPath id="${leftClipId}">
      <rect x="${leftX}" y="${contentY}" width="${leftW}" height="${leftH}" rx="10"></rect>
    </clipPath>
    ${buildProfileClipPath({
      enabled: hasProfileImage,
      clipId: profileClipId,
      cx: profileCx,
      cy: profileCy,
      radius: profileR,
    })}
  </defs>
  <g clip-path="url(#${leftClipId})">
  <rect x="${leftX + 6}" y="${contentY + 14}" width="2" height="80" rx="1" fill="${accent}" opacity="0.35"></rect>

  ${showProfileFrame ? `
  ${buildCircularProfileSlot({
    showFrame: showProfileFrame,
    hasProfileImage,
    cx: profileCx,
    cy: profileCy,
    radius: profileR,
    frameFill: surfaces.strongLine,
    profileUri: state.profileUri,
    clipId: profileClipId,
    avatar: state.avatar,
    fallbackFill: surfaces.textStrong,
    fallbackFontSize: 22,
    fallbackFontWeight: 700,
    fallbackYOffset: 9,
  })}
  <rect x="${leftX + 20}" y="${dividerY}" width="${leftW - 40}" height="1" fill="${surfaces.line}"></rect>
  <text x="${leftX + 20}" y="${aboutLabelY}" font-family="IBM Plex Mono, monospace" font-size="10" fill="${dim}" letter-spacing="0.8">ABOUT</text>
  ${state.username ? `<text x="${profileTextX}" y="${profileCy - 8}" font-family="Sora, Arial, sans-serif" font-size="18" font-weight="700" fill="${surfaces.textStrong}">${escapeXml(truncateTextPx(state.name, profileTextW, { fontSize: 18 }))}</text>
  <text x="${profileTextX}" y="${profileCy + 14}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">@${escapeXml(truncateTextPx(state.username, profileTextW - 8, { fontSize: 12 }))}</text>` : ""}` : ""}

  <circle cx="${leftX + 24}" cy="${roleY - 6}" r="3.5" fill="${accent}" filter="url(#glow-accent)"></circle>
  <text x="${leftX + 34}" y="${roleY}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${accent}">${escapeXml(truncateTextPx(state.role, roleTextW, { fontSize: 15 }))}</text>
  ${showLeftPanelBio ? bioLines.map((line, index) => {
    const lineY = bioTopY + index * bioLineH;
    if (lineY > contentY + leftH - 10) return "";
    return `<text x="${leftX + 20}" y="${lineY}" font-family="IBM Plex Mono, Apple SD Gothic Neo, Malgun Gothic, monospace" font-size="12" fill="${surfaces.textBody}">${renderBoldLine(line, surfaces.textStrong)}</text>`;
  }).join("\n  ") : ""}
  </g>

  ${showStats
    ? `<text x="${rightX + 18}" y="${statsLabelY}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${label}" letter-spacing="0.5">GITHUB STATS</text>
  ${buildStatBars(state.githubStats, rightX + 18, statsY, rightW - 36, accent, dim, surfaces.softLine, state.stats, state.barStyle, "bar-grad")}
  ${showLangs
    ? `<rect x="${rightX}" y="${rightPanelModuleTop - 8}" width="${rightW}" height="1" fill="${surfaces.line}"></rect>
  <text x="${rightX + 18}" y="${langsLabelY}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${label}" letter-spacing="0.5">TOP LANGS</text>
  ${shouldRenderLangIcons(state) && langsToShow
    ? buildLangIcons(state.langIconsUri, rightX + 18, langsY, rightW - 36, state.langIconCount ?? langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, rightX + 18, langsY, rightW - 36, accent, dim, surfaces.softLine, state.barStyle, "bar-grad")}`
    : ""}
  ${canShowContribs
    ? `<rect x="${rightX}" y="${contribDividerY}" width="${rightW}" height="1" fill="${surfaces.line}"></rect>
  ${buildContributionGrid(contributions, rightX + 18, contribGridY, rightW - 36, state.contribTheme, palette, amberContribOptions)}`
    : ""}`
    : `<text x="${rightX + 18}" y="${rightPanelDataTop + 13}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${label}" letter-spacing="0.5">TAGLINE</text>
  <text x="${rightX + 18}" y="${rightPanelDataTop + 44}" font-family="Sora, Arial, sans-serif" font-size="16" font-weight="600" fill="${surfaces.textStrong}">${escapeXml(truncateText(state.tagline, 52))}</text>
  ${state.role ? `<text x="${rightX + 18}" y="${rightPanelDataTop + 70}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(truncateText(state.role, 36))}</text>` : ""}`}

  <rect x="${outerX}" y="${footerY}" width="${outerW}" height="1" fill="url(#line-grad-h)"></rect>
  <circle cx="${outerX + 22}" cy="${footerY + 26}" r="5" fill="${surfaces.success}" filter="url(#glow-status)"></circle>
  <text x="${outerX + 36}" y="${footerY + 32}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(statusText, 52))}</text>
  ${state.hideCommand ? "" : `<text x="${state.width - 54}" y="${footerY + 32}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">$ ${escapeXml(truncateText(state.command, 32))}</text>`}`;
  };
});
