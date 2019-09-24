module.exports = {
  verbose: true,
  setupFiles: ["./tests/setup.js"],
  coveragePathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/components/**/*.css.ts",
    "<rootDir>/src/containers/**/*.css.ts",
    "<rootDir>/src/style/",
    "<rootDir>/src/typings/",
    "<rootDir>/src/types/",
    "<rootDir>/src/icon.ts",
  ],
  transformIgnorePatterns: ["/node_modules/", ".history/*", "lib", "dist", "build"],
  modulePathIgnorePatterns: ["/.history/", "lib", "dist", "build"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost",
  rootDir: __dirname,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/_mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/tests/_mocks/styleMock.js",
  },
};
