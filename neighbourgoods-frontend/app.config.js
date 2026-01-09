import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  "expo": {
      jsEngine: "hermes",
      name: "neighbourgoods",
      slug: "neighbourgoods",
      version: process.env.APP_VERSION || "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER || "com.default.bundle"
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: process.env.ANDROID_PACKAGE || "com.default.package"
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      extra: {
        apiUrl: process.env.API_URL
      }
  },
});
