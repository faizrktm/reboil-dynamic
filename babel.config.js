module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(!api.env('production') &&
      !api.env('test') && {plugins: ['react-refresh/babel']}),
  };
};
