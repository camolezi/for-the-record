var path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      loader: 'base64-loader',
      type: 'javascript/auto',
    });

    config.module.noParse = /\.wasm$/;

    config.module.rules.forEach((rule) => {
      (rule.oneOf || []).forEach((oneOf) => {
        if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          fs: path.resolve(__dirname, 'fsMock.js'),
        },
      },
    };
  },
};
