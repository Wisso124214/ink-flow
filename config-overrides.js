const { addBabelPlugin } = require('customize-cra');

module.exports = function override(config) {
  config = addBabelPlugin([
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@assets': './src/assets',
      },
    },
  ])(config);

  return config;
};