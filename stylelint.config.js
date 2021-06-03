module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include', 'mixin', 'at-root', 'extend', 'if', 'for', 'each'],
      },
    ],
    'no-descending-specificity': null,
    'comment-empty-line-before': null,
    'selector-list-comma-newline-after': 'always-multi-line',
    indentation: 2,
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates'] }],
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['animation', 'font-family'],
        ignoreKeywords: ['BlinkMacSystemFont', 'Helvetica', 'Arial'],
      },
    ],
    'max-nesting-depth': [
      3,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['media'],
      },
    ],
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['global'],
      },
    ],
  },
};
