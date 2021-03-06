module.exports = {
  presets: ['module:metro-react-native-babel-preset',],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
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
          '@services': './src/services/',
          '@assets': './src/assets/',
        },
      },
    ],
  ],
};
