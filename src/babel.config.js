module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env', 'next/babel'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ],
  env: {
    production: {
      plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
    },
  },
};
