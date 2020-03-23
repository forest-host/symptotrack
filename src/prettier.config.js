module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  insertPragma: false,
  jsxBracketSameLine: false,
  printWidth: 100,
  proseWrap: 'preserve',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
