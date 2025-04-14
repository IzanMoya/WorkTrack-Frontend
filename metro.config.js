const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      resolveRequest: (context, realModuleName, platform) => {
        if (platform === 'web') {
          if (realModuleName === '@invertase/react-native-apple-authentication') {
            const mockPath = path.resolve(__dirname, '__mocks__', '@invertase', 'react-native-apple-authentication.js');
            return { filePath: mockPath, type: 'sourceFile' };
          }
          if (realModuleName === 'react-native-maps') {
            const mockPath = path.resolve(__dirname, '__mocks__', 'react-native-maps', 'index.js');
            return { filePath: mockPath, type: 'sourceFile' };
          }
        }
        return context.resolveRequest(context, realModuleName, platform);
      },
    },
  };
})();