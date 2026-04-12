(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityLayouts = root.TerminalIdentityLayouts || {};
  root.TerminalIdentityLayouts.buildClassicLayout = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  return function buildClassicLayout(context, helpers) {
    const {
      state,
      palette,
      provider,
      surfaces,
      shellRadius,
      panelX,
      bodyTop,
      topBarFill,
      topBarText,
      effectiveTopLangs,
      effectiveContributions,
    } = context;
    const {
      STAT_KEYS,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildStatBars,
      escapeXml,
      estimateContributionSectionHeight,
      getContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getStatusText,
      isContributionFocus,
      shouldRenderLangIcons,
    } = helpers;

    const pad = 28;
    const bodyY = 128;
    const footerSeparatorY = state.height - 76;
    const footerTextY = state.height - 48;

    const contentX = state.hideAvatar ? pad + 28 : 256;
    const contentW = state.width - contentX - pad - 28;

    const labelY = bodyY + 16;
    const nameY = bodyY + 68;
    const roleY = bodyY + 108;
    const tagY = bodyY + 144;

    const dataTop = tagY + 32;
    const dataBottom = footerSeparatorY - 12;
    const dataH = Math.max(dataBottom - dataTop, 0);

    const statCount = (state.stats || STAT_KEYS).length;
    const statsH = statCount * 18;
    const showStats = state.githubStats && dataH >= statsH;
    const statsY = dataTop;

    const langsTop = showStats ? dataTop + statsH + 10 : dataTop;
    const langsAvailH = dataBottom - langsTop;
    const focusContribs = isContributionFocus(state, effectiveContributions);
    const maxLangs = effectiveTopLangs
      ? Math.min(effectiveTopLangs.length, Math.max(0, Math.floor(langsAvailH / 18)))
      : 0;
    const iconLangCount = getLangDisplayCount(state, effectiveTopLangs, { maxIcons: 6 });
    const showLangs = !focusContribs && (shouldRenderLangIcons(state)
      ? !!effectiveTopLangs && langsAvailH >= getLangSectionHeight(state, iconLangCount, { contentTop: 0, bottomPad: 8 })
      : maxLangs > 0);
    const langsToShow = showLangs
      ? (shouldRenderLangIcons(state) ? effectiveTopLangs.slice(0, iconLangCount) : effectiveTopLangs.slice(0, maxLangs))
      : null;
    const contribSectionH = estimateContributionSectionHeight(
      effectiveContributions,
      contentW,
      state.contribTheme,
      getContributionOptions(state, { contentTop: 8, bottomPad: 4 })
    );
    const showContribs = effectiveContributions && showStats && langsAvailH >= contribSectionH;

    return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${surfaces.bodyFill}"></rect>

  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${helpers.buildWindowButtons(provider, surfaces)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>

  ${state.hideAvatar ? "" : `<rect x="56" y="128" width="152" height="152" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="132" y="220" text-anchor="middle" font-family="Sora, Arial, sans-serif" font-size="52" font-weight="700" fill="${surfaces.accent}">${escapeXml(state.avatar)}</text>`}

  <text x="${contentX}" y="${labelY}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${palette.dim}">$ ${provider.label}/${state.theme}</text>
  <text x="${contentX}" y="${nameY}" font-family="Sora, Arial, sans-serif" font-size="44" font-weight="700" fill="${palette.title}">${escapeXml(state.name)}</text>
  <text x="${contentX}" y="${roleY}" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.accent}">${escapeXml(
    state.username ? `@${state.username}` : state.role
  )}</text>
  <text x="${contentX}" y="${tagY}" font-family="Sora, Arial, sans-serif" font-size="16" fill="${palette.text}">${escapeXml(state.tagline)}</text>

  ${showStats
    ? buildStatBars(state.githubStats, contentX, statsY, contentW, palette.accent, palette.dim, undefined, state.stats, state.barStyle)
    : `<circle cx="${contentX + 8}" cy="${dataTop + 8}" r="5" fill="${palette.success}"></circle>
  <text x="${contentX + 24}" y="${dataTop + 14}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${palette.dim}">${escapeXml(getStatusText(state))}</text>`}

  ${showStats && (showContribs || showLangs)
    ? `<rect x="${contentX}" y="${langsTop - 2}" width="${contentW}" height="1" fill="rgba(255,255,255,0.05)"></rect>
  ${showContribs
    ? buildContributionGrid(effectiveContributions, contentX, langsTop + 8, contentW, state.contribTheme, palette, getContributionOptions(state, { labelColor: palette.dim }))
    : shouldRenderLangIcons(state) && langsToShow
    ? buildLangIcons(state.langIconsUri, contentX, langsTop, contentW, state.langIconCount ?? langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, contentX, langsTop, contentW, palette.accent, palette.dim, undefined, state.barStyle)}`
    : ""}

  <rect x="28" y="${footerSeparatorY}" width="${state.width - 56}" height="1" fill="rgba(255,255,255,0.08)"></rect>
  <circle cx="56" cy="${state.height - 54}" r="5" fill="${palette.success}"></circle>
  <text x="72" y="${footerTextY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">${escapeXml(state.githubStats ? getStatusText(state) : state.status)}</text>
  ${state.hideCommand ? "" : `<text x="${state.width - pad - 28}" y="${footerTextY}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">$ ${escapeXml(state.command)}</text>`}
</svg>`.trim();
  };
});
