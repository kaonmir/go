module.exports = {
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: [
    "<rootDir>/**/*.test.(ts|tsx)",
    "<rootDir>/(tests/unit/**/*.spec.(ts|tsx)|**/__tests__/*.(ts|tsx))",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
