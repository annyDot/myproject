module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  transformIgnorePatterns: ["node_modules/(?!@angular|rjxs|@ngrx)"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  moduleNameMapper: {
    "^@component-library/components(.*)$":
      "<rootDir>/libs/component-library/components$1",
    "^@component-library/styles(.*)$":
      "<rootDir>/libs/component-library/styles$1",
  },
};
