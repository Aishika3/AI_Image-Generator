module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          path: require.resolve('path-browserify'),
        };
      }
  
      return config;
    },
  };
  