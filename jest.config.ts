export default {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/react"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
  },
};
