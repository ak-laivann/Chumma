const path = require("path");

const setupMirageJsForDemo = (config) => {
  const devSetup = path.resolve(__dirname, "src/index.development.ts");
  if (Array.isArray(config.entry)) {
    config.entry.push(devSetup);
  } else {
    config.entry = [config.entry, devSetup];
  }

  return config;
};

module.exports = function override(config, env) {
  config = setupMirageJsForDemo(config);

  let latestConfig = {
    ...config,
  };
  return latestConfig;
};
