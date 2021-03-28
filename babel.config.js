module.exports = (api) => {
  // This caches the Babel config
  const DEV = !api.env('production') && !api.env('test');
  const FAST_REFRESH = DEV ? ['react-refresh/babel'] : [];
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
      '@vanilla-extract/babel-plugin',
      '@babel/plugin-syntax-dynamic-import',
      // Applies the react-refresh Babel plugin on non-production modes only,
      ...FAST_REFRESH,
    ],
  };
};
