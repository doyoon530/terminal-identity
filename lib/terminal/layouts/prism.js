(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityLayouts = root.TerminalIdentityLayouts || {};
  root.TerminalIdentityLayouts.buildPrismCanvas = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  return function buildPrismCanvas(state, palette, provider, topLangs, contributions, surfaces, helpers) {
    const {
      ICON_SIZES,
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
      getPrismLowerRequirements,
      getStatusText,
      safeSvgId,
      shouldRenderLangIcons,
      truncateTextPx,
    } = helpers;

    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;

    const innerW = state.width - 116;
    const llW = Math.round(innerW * 0.345);
    const lmW = Math.round(innerW * 0.195);
    const lrW = innerW - llW - lmW - 28;

    const cardX = 58;
    const cardY = outerY + 36;
    const cardW = state.width - 116;
    const { lowerRequired } = getPrismLowerRequirements(state, topLangs, contributions, llW, lrW);
    const minCardH = 154;
    const baseLowerH = Math.min(Math.round(outerH * 0.30), state.heightAuto ? 190 : 130);
    const lowerH = state.heightAuto ? Math.max(baseLowerH, lowerRequired) : baseLowerH;
    const cardH = Math.max(minCardH, outerH - 50 - 14 - lowerH);
    const lowerY = cardY + cardH + 14;

    const llX = 58;
    const lmX = llX + llW + 14;
    const lrX = lmX + lmW + 14;

    const cS = Math.min(cardH / 148, 1.35);
    const metaY = cardY + Math.round(26 * cS);
    const baseNameY = cardY + Math.round(72 * cS);
    const baseHandleY = cardY + Math.round(106 * cS);
    const baseTagY = cardY + Math.min(Math.round(136 * cS), cardH - 12);
    const showProfileFrame = !state.hideProfile;
    const hasProfileImage = !!state.profileUri;
    const profileR = 28;
    const profileCx = cardX + 28 + profileR;
    const profileCy = cardY + Math.round(84 * cS);
    const profileClipId = safeSvgId("profile-clip", `prism-${state.username || state.name}`);
    const profileTextX = showProfileFrame ? profileCx + profileR + 18 : cardX + 24;
    const profileTextW = Math.max(120, cardX + cardW - 24 - profileTextX);
    const nameFontSize = showProfileFrame ? 28 : 34;
    const handleFontSize = showProfileFrame ? 15 : 16;
    const nameY = showProfileFrame ? cardY + Math.round(76 * cS) : baseNameY;
    const handleY = showProfileFrame ? cardY + Math.round(108 * cS) : baseHandleY;
    const tagX = showProfileFrame ? profileTextX : cardX + 24;
    const tagW = showProfileFrame ? profileTextW : cardW - 48;
    const tagY = showProfileFrame ? Math.min(cardY + Math.round(140 * cS), cardY + cardH - 12) : baseTagY;

    const accent = surfaces.accent;
    const ink = surfaces.textStrong;
    const dim = surfaces.textMuted;
    const model = `${provider.label}/${state.theme}`;
    const sectionGap = 12;
    const activityModuleTop = lowerY + 34;
    const langCount = topLangs?.length ? getLangDisplayCount(state, topLangs, { maxIcons: 6 }) : 0;
    const langSectionH = topLangs?.length && langCount > 0
      ? getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 })
      : 0;
    const prismContribOptions = getContributionOptions(state, { labelColor: dim, contentTop: 28, bottomPad: 8 });
    const contribSectionH = contributions?.weeks?.length
      ? estimateContributionSectionHeight(contributions, lrW - 36, state.contribTheme, prismContribOptions)
      : 0;
    const stackedRequiredH = 34 + langSectionH + (langSectionH && contribSectionH ? sectionGap : 0) + contribSectionH + 8;
    const showLangs = !!topLangs?.length && langSectionH > 0 && lowerH >= stackedRequiredH && lrW >= 180;
    const showContribs = !!contributions?.weeks?.length && lowerH >= (34 + (showLangs ? langSectionH + sectionGap : 0) + contribSectionH + 8) && lrW >= 180;
    const contribTop = activityModuleTop + (showLangs ? langSectionH + sectionGap : 0);
    const langsToShow = showLangs ? topLangs.slice(0, langCount) : null;
    const activityTitle = showLangs || showContribs
      ? "activity"
      : topLangs
        ? "top langs"
        : state.githubStats
          ? "github stats"
          : "status";

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="${surfaces.bodyFill}"></rect>
  ${hasProfileImage ? `<defs>
    ${buildProfileClipPath({
      enabled: hasProfileImage,
      clipId: profileClipId,
      cx: profileCx,
      cy: profileCy,
      radius: profileR,
    })}
  </defs>` : ""}
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="10" fill="${surfaces.panelFill}"></rect>
  <text x="${cardX + 24}" y="${metaY}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prism canvas • ${escapeXml(model)}</text>
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
    fallbackFontSize: 22,
    fallbackFontWeight: 700,
    fallbackYOffset: 8,
  })}` : ""}
  <text x="${profileTextX}" y="${nameY}" font-family="Sora, Arial, sans-serif" font-size="${nameFontSize}" font-weight="700" fill="${ink}">${escapeXml(
    truncateTextPx(state.name, profileTextW, { fontSize: nameFontSize })
  )}</text>
  <text x="${profileTextX}" y="${handleY}" font-family="IBM Plex Mono, monospace" font-size="${handleFontSize}" fill="${dim}">${escapeXml(
    truncateTextPx(state.username ? `@${state.username}` : state.role, profileTextW, { fontSize: handleFontSize })
  )}</text>
  <text x="${tagX}" y="${tagY}" font-family="Sora, Arial, sans-serif" font-size="15" fill="${dim}">${escapeXml(
    truncateTextPx(state.tagline, tagW, { fontSize: 15 })
  )}</text>

  <rect x="${llX}" y="${lowerY}" width="${llW}" height="${lowerH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${llX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${topLangs ? "github stats" : "quick facts"}</text>
  ${topLangs
    ? buildStatBars(state.githubStats, llX + 18, lowerY + 34, llW - 36, accent, dim, surfaces.softLine, state.stats, state.barStyle)
    : `<text x="${llX + 18}" y="${lowerY + 56}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">avatar   ${escapeXml(state.avatar)}</text>
  <text x="${llX + 18}" y="${lowerY + 80}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(
    state.username ? `github  @${state.username}` : `pattern  ${state.pattern}`
  )}</text>`}

  <rect x="${lmX}" y="${lowerY}" width="${lmW}" height="${lowerH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${lmX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  ${state.hideCommand ? "" : `<text x="${lmX + 18}" y="${lowerY + 56}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateTextPx(state.command, 112, { fontSize: 13 }))}</text>`}
  <text x="${lmX + 18}" y="${lowerY + 80}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">theme   ${escapeXml(state.theme)}</text>

  <rect x="${lrX}" y="${lowerY}" width="${lrW}" height="${lowerH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${lrX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${activityTitle}</text>
  ${showLangs
    ? `<text x="${lrX + 18}" y="${activityModuleTop + 11}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dim}" letter-spacing="0.5">TOP LANGS</text>
  ${shouldRenderLangIcons(state) && langsToShow
    ? buildLangIcons(state.langIconsUri, lrX + 18, activityModuleTop + 22, lrW - 36, state.langIconCount ?? langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, lrX + 18, activityModuleTop + 22, lrW - 36, accent, dim, surfaces.softLine, state.barStyle)}`
    : ""}
  ${showContribs
    ? `${showLangs ? `<rect x="${lrX + 18}" y="${contribTop - 2}" width="${lrW - 36}" height="1" fill="${surfaces.line}"></rect>` : ""}
  ${buildContributionGrid(contributions, lrX + 18, contribTop + prismContribOptions.contentTop, lrW - 36, state.contribTheme, palette, prismContribOptions)}`
    : showLangs
    ? ""
    : topLangs
    ? (shouldRenderLangIcons(state)
        ? buildLangIcons(state.langIconsUri, lrX + 18, lowerY + 34, lrW - 36, state.langIconCount ?? topLangs.length, state.iconSize)
        : buildLangBars(topLangs, lrX + 18, lowerY + 34, lrW - 36, accent, dim, surfaces.softLine, state.barStyle))
    : state.githubStats
      ? buildStatBars(state.githubStats, lrX + 18, lowerY + 34, lrW - 36, accent, dim, surfaces.softLine, state.stats, state.barStyle)
      : `<circle cx="${lrX + 26}" cy="${lowerY + 58}" r="5" fill="${accent}"></circle>
  <text x="${lrX + 40}" y="${lowerY + 64}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateTextPx(statusText, 180, { fontSize: 13 }))}</text>`}`;
  };
});
