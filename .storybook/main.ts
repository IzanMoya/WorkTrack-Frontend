const { resolve } = require('path');
const { readdirSync } = require('fs');

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const appDirectory = resolve(__dirname, '../src');
const moduleDirectories = [
  'node_modules',
  appDirectory,
  ...getDirectories(resolve(appDirectory, 'components')),
  ...getDirectories(resolve(appDirectory, 'screens')),
  // Add more directories for your components/screens if needed
];

module.exports = {
  stories: [
    '../src/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
  webpackFinal: (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      ...moduleDirectories,
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': 'react-native-web',
    };
    return config;
  },
};