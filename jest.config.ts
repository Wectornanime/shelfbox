import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@components/(.*)$": "<rootDir>/src/ui/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/ui/pages/$1",
  },

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ["src/**/*.case.ts", "!src/**/*.d.ts"],

  setupFiles: ["<rootDir>/jestSetup.ts"],
};

export default config;
