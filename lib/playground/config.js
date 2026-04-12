(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityPlaygroundConfig = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const FORM_FIELD_IDS = [
    "name",
    "username",
    "role",
    "tagline",
    "bio",
    "status",
    "command",
    "provider",
    "theme",
    "pattern",
    "avatar",
    "width",
    "height",
    "accent",
    "showLangs",
    "langCount",
    "langStyle",
    "iconSize",
    "barStyle",
    "showContribs",
    "contribTheme",
    "contribRange",
    "contribMode",
    "motion",
    "link",
  ];

  const STAT_KEYS = ["repos", "stars", "forks", "followers"];

  const SELECT_OPTIONS = {
    provider: [
      { value: "amber", label: "Amber" },
      { value: "classic", label: "Classic" },
      { value: "obsidian", label: "Obsidian" },
      { value: "prism", label: "Prism" },
    ],
    theme: [
      { value: "solar", label: "Solar Gold" },
      { value: "ember", label: "Ember Shell" },
      { value: "aurora", label: "Aurora Mint" },
      { value: "cobalt", label: "Cobalt Night" },
      { value: "velvet", label: "Velvet Signal" },
      { value: "graphite", label: "Graphite Mono" },
      { value: "matcha", label: "Matcha Console" },
      { value: "sakura", label: "Sakura Bloom" },
    ],
    pattern: [
      { value: "grid", label: "Grid" },
      { value: "rings", label: "Rings" },
      { value: "pulse", label: "Pulse" },
    ],
    showLangs: [
      { value: "auto", label: "Auto" },
      { value: "on", label: "Always show" },
      { value: "off", label: "Hide" },
    ],
    langStyle: [
      { value: "bar", label: "Bars" },
      { value: "icons", label: "Icons" },
    ],
    iconSize: [
      { value: "sm", label: "Small" },
      { value: "md", label: "Medium" },
      { value: "lg", label: "Large" },
    ],
    barStyle: [
      { value: "bar", label: "Bar" },
      { value: "dots", label: "Dots" },
      { value: "blocks", label: "Blocks" },
    ],
    showContribs: [
      { value: "off", label: "Off" },
      { value: "on", label: "Always show" },
      { value: "auto", label: "Auto with username" },
    ],
    contribTheme: [
      { value: "cat_jump", label: "Cat Jump" },
      { value: "popcat", label: "Popcat" },
      { value: "capybara_onsen", label: "Capybara Onsen" },
      { value: "moon", label: "Moon Phase" },
      { value: "star", label: "Starfield" },
      { value: "orbit", label: "Orbit" },
      { value: "signal", label: "Signal" },
      { value: "citylight", label: "Citylight" },
      { value: "moss", label: "Moss" },
      { value: "petal", label: "Petal" },
      { value: "firefly", label: "Firefly" },
      { value: "constellation", label: "Constellation" },
    ],
    contribRange: [
      { value: "4w", label: "4 weeks" },
      { value: "8w", label: "8 weeks" },
      { value: "12w", label: "12 weeks" },
      { value: "3m", label: "3 months" },
      { value: "16w", label: "16 weeks" },
      { value: "24w", label: "24 weeks" },
      { value: "26w", label: "26 weeks" },
      { value: "6m", label: "6 months" },
      { value: "39w", label: "39 weeks" },
      { value: "9m", label: "9 months" },
      { value: "1y", label: "1 year" },
    ],
    contribMode: [
      { value: "compact", label: "Compact" },
      { value: "focus", label: "Focus" },
    ],
    motion: [
      { value: "off", label: "Static" },
      { value: "pulse", label: "Pulse" },
      { value: "scan", label: "Scan" },
      { value: "boot", label: "Boot" },
    ],
  };

  return {
    FORM_FIELD_IDS,
    SELECT_OPTIONS,
    STAT_KEYS,
  };
});
