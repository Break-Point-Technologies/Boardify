const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

const srcPath = path.resolve(__dirname, "src");

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
  extraNodeModules: {
    "@": srcPath,
  },
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName.startsWith("@/")) {
      const resolvedPath = moduleName.replace("@/", srcPath + "/");
      return context.resolveRequest(context, resolvedPath, platform);
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });