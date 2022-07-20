module.exports = {
  plugins: ["import"],
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "indent": "off",
    "import/prefer-default-export": "off",
    "import/no-named-default": "off",
    "no-useless-constructor": "off",
    "no-param-reassign": "off",
    "prettier/prettier": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/extensions": "off",
    "import/no-unresolved": "error",
    "import/no-cycle": "off",
    "no-unused-vars": "error",
    "no-bitwise": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-shadow": "off"
  },
  parser: "@typescript-eslint/parser",
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },

      // use <root>/tsconfig.json
      "typescript": {
        "alwaysTryTypes": true
      },
    }
  }
};
