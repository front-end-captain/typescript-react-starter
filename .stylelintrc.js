// https://stylelint.io/user-guide/rules/

module.exports = {
  processors: ["stylelint-processor-styled-components"],
  extends: ["stylelint-config-standard", "stylelint-config-styled-components"],
  syntax: "css",
  rules: {
    indentation: [2, { except: ["value"] }],
    "no-descending-specificity": null,
    "comment-empty-line-before": null,
    "selector-pseudo-element-colon-notation": "single",
    "value-list-max-empty-lines": 0,
    "font-family-no-missing-generic-family-keyword": null,
    "declaration-colon-newline-after": null,
  },
};
