import { resolve } from 'path';

export default {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add polyfill for crypto module
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
      };
      return webpackConfig;
    },
  },
};
