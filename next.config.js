const withFonts = require("next-fonts");
const path = require("path");

module.exports = withFonts({
  cssModules: true,
  webpack: (config) => {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
});
