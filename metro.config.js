// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// const path = require('path');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {
//   resolver: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { execSync } = require('child_process');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

function isPortInUse(port) {
  try {
    // Check port on Windows (netstat) or MacOS/Linux (lsof)
    const command =
      process.platform === 'win32'
        ? `netstat -ano | findstr :${port}`
        : `lsof -i :${port}`;
    const output = execSync(command).toString();
    return output.length > 0; // If output exists, the port is in use
  } catch (error) {
    return false; // If command fails, port is not in use
  }
}

/**
 * Dynamically assign port: 8081 if free, otherwise try the next port
 */
const DEFAULT_PORT = 8081;
let port = DEFAULT_PORT;

// Check ports from 8081 up to 8090 (you can increase the range if needed)
for (let i = DEFAULT_PORT; i <= 8090; i++) {
  if (!isPortInUse(i)) {
    port = i;
    break;
  }
}

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'css', 'scss'],
  },
  server: {
    port, // Dynamically assigned port
  },
};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, config),
);
