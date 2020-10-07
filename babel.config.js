module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [
          './src',
        ],
        alias: {
          '@navigations': './src/navigations/',
          '@components': './src/components/',
          '@hooks': './src/hooks/',
          '@dtos': './src/dtos/',
          '@utils': './src/utils/',
          '@styles': './src/styles/',
        },
      },
    ],
  ],
};
