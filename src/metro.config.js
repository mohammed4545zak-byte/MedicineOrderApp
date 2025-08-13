// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// This workaround is sometimes necessary when persistent import errors occur.
// If you do not need to reference 'importLocationsPlugin', a basic config is enough.
module.exports = defaultConfig;
