(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityLayouts = root.TerminalIdentityLayouts || {};
  root.TerminalIdentityLayouts.buildObsidianWorkspace = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  return function buildObsidianWorkspace(state, palette, provider, topLangs, contributions, surfaces, helpers) {
    const {
      buildCircularProfileSlot,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildProfileClipPath,
      buildStatBars,
      escapeXml,
      estimateContributionSectionHeight,
      getContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getObsidianResponseRequiredHeight,
      getStatusText,
      safeSvgId,
      shouldRenderLangIcons,
      truncateText,
      truncateTextPx,
    } = helpers;

    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;

    const leftX = 52;
    const leftY = 128;
    const leftW = Math.min(260, Math.round(outerW * 0.27));
    const leftH = outerH - 86;
    const showProfileFrame = !state.hideProfile;
    const hasProfileImage = !!state.profileUri;
    const profileR = 24;
    const profileCx = leftX + 18 + profileR;
    const profileCy = leftY + 56;
    const profileClipId = safeSvgId("profile-clip", `obsidian-${state.username || state.name}`);
    const profileTextX = showProfileFrame ? profileCx + profileR + 14 : leftX + 18;
    const profileTextW = Math.max(40, leftX + leftW - 18 - profileTextX);
    const nameY = showProfileFrame ? leftY + 60 : leftY + 62;
    const handleY = showProfileFrame ? leftY + 82 : leftY + 84;
    const dividerY = showProfileFrame ? leftY + 100 : 0;
    const roleLabelY = showProfileFrame ? leftY + 126 : leftY + 130;
    const roleY = showProfileFrame ? leftY + 148 : leftY + 152;
    const modelLabelY = showProfileFrame ? leftY + 192 : leftY + 196;
    const modelY = showProfileFrame ? leftY + 214 : leftY + 218;

    const mainX = leftX + leftW + 18;
    const mainY = 128;
    const mainW = state.width - mainX - 52;

    const availH = outerH - 86;
    const responseRequiredH = getObsidianResponseRequiredHeight(state, topLangs, contributions, mainW);
    const minMainH = 160;
    const baseResponseH = Math.max(availH - Math.round(availH * 0.56) - 14, 60);
    const responseH = state.heightAuto
      ? Math.max(responseRequiredH, Math.min(baseResponseH, availH - minMainH - 14))
      : baseResponseH;
    const mainH = Math.max(minMainH, availH - responseH - 14);
    const responseY = mainY + mainH + 14;

    const mS = Math.min(mainH / 174, 1.35);
    const labelY = mainY + 24;
    const tagY = mainY + Math.round(64 * mS);
    const dividerMainY = mainY + Math.round(88 * mS);
    const commandY = mainY + Math.round(122 * mS);
    const dotCy = mainY + Math.round(148 * mS);
    const statusTextY = mainY + Math.round(154 * mS);

    const accent = surfaces.accent;
    const ink = surfaces.textStrong;
    const dim = surfaces.textMuted;
    const model = `${provider.label}/${state.theme}`;
    const sectionGap = 12;
    const responseModuleTop = responseY + 34;
    const langCount = topLangs?.length ? getLangDisplayCount(state, topLangs, { maxIcons: 6 }) : 0;
    const langSectionH = topLangs?.length && langCount > 0
      ? getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 })
      : 0;
    const obsidianContribOptions = getContributionOptions(state, { labelColor: dim, contentTop: 28, bottomPad: 8 });
    const contribSectionH = contributions?.weeks?.length
      ? estimateContributionSectionHeight(contributions, mainW - 44, state.contribTheme, obsidianContribOptions)
      : 0;
    const stackedRequiredH = 34 + langSectionH + (langSectionH && contribSectionH ? sectionGap : 0) + contribSectionH + 8;
    const showLangs = !!topLangs?.length && langSectionH > 0 && responseH >= stackedRequiredH;
    const showContribs = !!contributions?.weeks?.length && responseH >= (34 + (showLangs ? langSectionH + sectionGap : 0) + contribSectionH + 8);
    const contribTop = responseModuleTop + (showLangs ? langSectionH + sectionGap : 0);
    const langsToShow = showLangs ? topLangs.slice(0, langCount) : null;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="${surfaces.bodyFill}"></rect>

  <rect x="${leftX}" y="${leftY}" width="${leftW}" height="${leftH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  ${hasProfileImage ? `<defs>
    ${buildProfileClipPath({
      enabled: hasProfileImage,
      clipId: profileClipId,
      cx: profileCx,
      cy: profileCy,
      radius: profileR,
    })}
  </defs>` : ""}
  <text x="${leftX + 18}" y="${leftY + 22}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">workspace</text>
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
    fallbackFill: ink,
    fallbackFontSize: 18,
    fallbackFontWeight: 600,
    fallbackYOffset: 6,
  })}
  <rect x="${leftX + 18}" y="${dividerY}" width="${leftW - 36}" height="1" fill="${surfaces.line}"></rect>` : ""}
  <text x="${profileTextX}" y="${nameY}" font-family="IBM Plex Mono, monospace" font-size="17" fill="${ink}">${escapeXml(truncateTextPx(state.name, profileTextW, { fontSize: 17 }))}</text>
  <text x="${profileTextX}" y="${handleY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(
    state.username ? `@${state.username}` : "personal workspace"
  )}</text>
  <text x="${leftX + 18}" y="${roleLabelY}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">role</text>
  <text x="${leftX + 18}" y="${roleY}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(
    truncateText(state.role, 20)
  )}</text>
  <text x="${leftX + 18}" y="${modelLabelY}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">model</text>
  <text x="${leftX + 18}" y="${modelY}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(model)}</text>

  <rect x="${mainX}" y="${mainY}" width="${mainW}" height="${mainH}" rx="10" fill="${surfaces.panelFill}"></rect>
  <text x="${mainX + 22}" y="${labelY}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  <text x="${mainX + 22}" y="${tagY}" font-family="Sora, Arial, sans-serif" font-size="22" font-weight="700" fill="${ink}">${escapeXml(
    truncateText(state.tagline, 36)
  )}</text>
  <rect x="${mainX + 22}" y="${dividerMainY}" width="${mainW - 44}" height="1" fill="${surfaces.line}"></rect>
  ${state.hideCommand ? "" : `<text x="${mainX + 22}" y="${commandY}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${dim}">$ ${escapeXml(state.command)}</text>`}
  <circle cx="${mainX + 22}" cy="${dotCy}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${statusTextY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(
    truncateText(statusText, 48)
  )}</text>

  <rect x="${mainX}" y="${responseY}" width="${mainW}" height="${responseH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${mainX + 22}" y="${responseY + 22}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">output</text>
  ${showLangs
    ? `<text x="${mainX + 22}" y="${responseModuleTop + 11}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dim}" letter-spacing="0.5">TOP LANGS</text>
  ${shouldRenderLangIcons(state) && langsToShow
    ? buildLangIcons(state.langIconsUri, mainX + 22, responseModuleTop + 22, mainW - 44, state.langIconCount ?? langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, mainX + 22, responseModuleTop + 22, mainW - 44, accent, dim, surfaces.softLine, state.barStyle)}`
    : ""}
  ${showContribs
    ? `${showLangs ? `<rect x="${mainX + 22}" y="${contribTop - 2}" width="${mainW - 44}" height="1" fill="${surfaces.line}"></rect>` : ""}
  ${buildContributionGrid(contributions, mainX + 22, contribTop + obsidianContribOptions.contentTop, mainW - 44, state.contribTheme, palette, obsidianContribOptions)}`
    : showLangs
    ? ""
    : state.githubStats
    ? (!showLangs && topLangs
        ? (shouldRenderLangIcons(state)
            ? buildLangIcons(state.langIconsUri, mainX + 22, responseY + 34, mainW - 44, state.langIconCount ?? topLangs.length, state.iconSize)
            : buildLangBars(topLangs, mainX + 22, responseY + 34, mainW - 44, accent, dim, surfaces.softLine, state.barStyle))
        : buildStatBars(state.githubStats, mainX + 22, responseY + 34, mainW - 44, accent, dim, surfaces.softLine, state.stats, state.barStyle))
    : `<text x="${mainX + 22}" y="${responseY + 52}" font-family="Sora, Arial, sans-serif" font-size="15" font-weight="600" fill="${ink}">${escapeXml(truncateText(state.tagline, 38))}</text>
  <circle cx="${mainX + 22}" cy="${responseY + 76}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${responseY + 82}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(state.status, 44))}</text>`}

  <rect x="${outerX}" y="${footerY}" width="${outerW}" height="1" fill="${surfaces.softLine}"></rect>
  <circle cx="${outerX + 22}" cy="${footerY + 24}" r="5" fill="${accent}"></circle>
  <text x="${outerX + 36}" y="${footerY + 30}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(truncateText(statusText, 64))}</text>`;
  };
});
