(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityPlaygroundPreview = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  function createPreviewUtils(deps) {
    const {
      LANG_ICON_MAP,
      buildSvg,
      buildApiUrl,
      buildMarkdown,
      getApiBaseUrl,
      normalizeUsername,
      previewSummary,
      heroSummary,
      previewDiagnostics,
      svgMount,
      updateExportPanel,
      updateGithubLink,
      updateShareUrl,
      saveState,
    } = deps;
    let lastCommitKey = "";
    let lastRenderedSvg = "";

    function getFilteredLangs(state, githubStats) {
      if (!githubStats?.topLangs?.length) {
        return [];
      }

      return githubStats.topLangs.filter((lang) => !state.excludeLangs.includes(lang.name.toLowerCase()));
    }

    function getSupportedIconLangs(state, githubStats) {
      return getFilteredLangs(state, githubStats).filter((lang) => Boolean(LANG_ICON_MAP[lang.name]));
    }

    function getRequestedGithubFields(state) {
      const fields = [];

      if (!state.hideProfile) {
        fields.push("avatar");
      }
      if (state.showLangs !== "off") {
        fields.push("langs");
      }
      if (state.showContribs !== "off") {
        fields.push("contribs");
      }

      return fields;
    }

    function getSummaryChips(state, githubStats, options = {}) {
      const includeUsername = options.includeUsername === true;
      const chips = [`${state.provider}/${state.theme}`, state.pattern];

      if (includeUsername && state.username) {
        chips.push(`@${state.username}`);
      }

      if (state.showLangs !== "off") {
        const filtered = getFilteredLangs(state, githubStats);
        const count = state.langStyle === "icons"
          ? Math.min(getSupportedIconLangs(state, githubStats).length, state.langCount)
          : Math.min(filtered.length, state.langCount);
        chips.push(`${state.langStyle} ${count}/${state.langCount} langs`);
      }

      if (state.showContribs !== "off") {
        chips.push(`${state.contribTheme} ${state.contribRange}`);
      }

      if (state.motion !== "off") {
        chips.push(`motion ${state.motion}`);
      }

      if (state.excludeLangs.length > 0) {
        chips.push(`exclude ${state.excludeLangs.length}`);
      }

      return chips;
    }

    function renderSummary(state, githubStats) {
      const previewChips = getSummaryChips(state, githubStats, { includeUsername: true })
        .map((chip) => `<span class="summary-chip">${chip}</span>`)
        .join("");
      const heroChips = getSummaryChips(state, githubStats)
        .map((chip) => `<span class="summary-chip">${chip}</span>`)
        .join("");

      heroSummary.innerHTML = heroChips;
      previewSummary.innerHTML = previewChips;
    }

    function renderDiagnostics(state, githubStats, meta = {}) {
      const diagnostics = [];
      const isLoading = meta.loading === true;

      if (meta.renderError) {
        diagnostics.push({
          tone: "warn",
          text: "The live preview hit a render hiccup, so it fell back to a simpler card while keeping your current settings.",
        });
      }

      if (!state.username) {
        diagnostics.push({
          tone: "info",
          text: "Add a GitHub username to unlock live stats, top languages, profile images, and contribution activity.",
        });
      } else if (isLoading && !githubStats) {
        diagnostics.push({
          tone: "info",
          text: "Loading GitHub data for this card now.",
        });
      } else if (!githubStats) {
        diagnostics.push({
          tone: "warn",
          text: "GitHub data did not load right now. The card is using your manual fallback text instead.",
        });
      }

      if (state.showLangs !== "off") {
        if (!state.username) {
          diagnostics.push({
            tone: "info",
            text: "Top languages appear after you add a GitHub username.",
          });
        } else if (isLoading && !githubStats?.topLangs?.length) {
          diagnostics.push({
            tone: "info",
            text: "Loading language data from GitHub.",
          });
        } else if (!githubStats?.topLangs?.length) {
          diagnostics.push({
            tone: "warn",
            text: "GitHub did not return language data for this profile.",
          });
        } else {
          const filteredLangs = getFilteredLangs(state, githubStats);

          if (filteredLangs.length === 0) {
            diagnostics.push({
              tone: "warn",
              text: "Every detected language is excluded right now.",
            });
          } else if (state.langStyle === "icons") {
            const supportedLangs = getSupportedIconLangs(state, githubStats);
            const unsupportedLangs = filteredLangs.filter((lang) => !LANG_ICON_MAP[lang.name]);

            if (supportedLangs.length === 0) {
              diagnostics.push({
                tone: "warn",
                text: "No icon-supported languages remain after filtering. Switch to bars or change your exclusions.",
              });
            } else {
              if (unsupportedLangs.length > 0) {
                diagnostics.push({
                  tone: "info",
                  text: `Skipped unsupported icon languages: ${unsupportedLangs.map((lang) => lang.name).join(", ")}.`,
                });
              }

              if (supportedLangs.length < state.langCount) {
                diagnostics.push({
                  tone: "info",
                  text: `Showing ${supportedLangs.length} of ${state.langCount} requested icon languages after filtering.`,
                });
              }
            }
          } else if (filteredLangs.length < state.langCount) {
            diagnostics.push({
              tone: "info",
              text: `Showing ${filteredLangs.length} of ${state.langCount} requested languages after filtering.`,
            });
          }
        }
      }

      if (state.showContribs !== "off") {
        if (!state.username) {
          diagnostics.push({
            tone: "info",
            text: "Contribution activity appears after you add a GitHub username.",
          });
        } else if (isLoading && !githubStats?.contributions?.weeks?.length) {
          diagnostics.push({
            tone: "info",
            text: "Loading contribution activity from GitHub.",
          });
        } else if (!githubStats?.contributions?.weeks?.length) {
          diagnostics.push({
            tone: "warn",
            text: "Contribution data is unavailable right now, so the card is hiding the activity block.",
          });
        }
      }

      previewDiagnostics.innerHTML = diagnostics
        .map((item) => `<p class="diagnostic-item ${item.tone}">${item.text}</p>`)
        .join("");
    }

    function buildRenderedState(state, githubStats) {
      let nextState = githubStats ? { ...state, githubStats } : state;

      if (githubStats && !state.hideProfile && (githubStats.avatarDataUri || githubStats.avatarUrl)) {
        nextState = {
          ...nextState,
          profileUri: githubStats.avatarDataUri || `${githubStats.avatarUrl}&s=120`,
        };
      }

      if (nextState.langStyle === "icons" && nextState.githubStats?.topLangs) {
        const supportedLangs = getSupportedIconLangs(nextState, nextState.githubStats)
          .slice(0, nextState.langCount);
        const iconKeys = supportedLangs.map((lang) => LANG_ICON_MAP[lang.name]);
        if (iconKeys.length > 0) {
          nextState = {
            ...nextState,
            langIconsUri: `https://skillicons.dev/icons?i=${iconKeys.join(",")}`,
            langIconCount: iconKeys.length,
          };
        }
      }

      return nextState;
    }

    function getContributionSignature(contributions) {
      if (!contributions?.weeks?.length) {
        return "";
      }

      return contributions.weeks
        .map((week) =>
          Array.isArray(week?.contributionDays)
            ? week.contributionDays.map((day) => Number(day?.contributionCount || 0)).join(".")
            : ""
        )
        .join("|");
    }

    function getGithubSignature(githubStats) {
      if (!githubStats) {
        return "";
      }

      return JSON.stringify({
        name: githubStats.name || "",
        avatarUrl: githubStats.avatarUrl || "",
        avatarDataUri: githubStats.avatarDataUri || "",
        repos: Number(githubStats.repos || 0),
        followers: Number(githubStats.followers || 0),
        stars: Number(githubStats.stars || 0),
        forks: Number(githubStats.forks || 0),
        topLangs: Array.isArray(githubStats.topLangs)
          ? githubStats.topLangs.map((lang) => `${lang.name}:${lang.count}`)
          : [],
        contributions: getContributionSignature(githubStats.contributions),
      });
    }

    function commitRender(baseState, renderedState, githubStats, meta = {}) {
      const apiUrl = buildApiUrl(baseState, getApiBaseUrl());
      const link = document.getElementById("link").value.trim();
      let finalState = renderedState;
      let svg = "";
      let renderError = null;
      const renderKey = [
        apiUrl,
        link,
        renderedState.profileUri || "",
        renderedState.langIconsUri || "",
        String(renderedState.langIconCount || 0),
        getGithubSignature(githubStats || renderedState.githubStats || null),
        meta.loading === true ? "loading" : "ready",
      ].join("|");

      if (renderKey === lastCommitKey && lastRenderedSvg) {
        svg = lastRenderedSvg;
      } else {
        try {
          svg = buildSvg(renderedState);
        } catch (error) {
          console.error("[playground] render failed", error);
          renderError = error;
          finalState = baseState;
          svg = buildSvg(baseState);
        }
        lastCommitKey = renderError ? `${renderKey}|fallback` : renderKey;
        lastRenderedSvg = svg;
      }

      deps.setExportPayload({
        markdown: buildMarkdown(apiUrl, link),
        api: apiUrl,
        svg,
      });

      svgMount.innerHTML = svg;
      updateExportPanel();
      renderSummary(finalState, githubStats || finalState.githubStats || null);
      renderDiagnostics(finalState, githubStats || finalState.githubStats || null, {
        ...meta,
        renderError,
      });
      updateGithubLink(normalizeUsername(baseState.username));
      updateShareUrl(baseState);
      saveState(baseState);
    }

    return {
      buildRenderedState,
      commitRender,
      getFilteredLangs,
      getRequestedGithubFields,
      getSupportedIconLangs,
      renderDiagnostics,
      renderSummary,
    };
  }

  return {
    createPreviewUtils,
  };
});
