const ERROR = 2;

const OFF = 0;

const COUNT = 1;

const REACT_RULES = {
  "react/no-children-prop": ERROR,
  "react/no-deprecated": ERROR,
  "react/no-multi-comp": ERROR,
  "react/no-string-refs": ERROR,
  "react/no-unescaped-entities": ERROR,
  "react/no-unstable-nested-components": OFF,
  "react/self-closing-comp": ERROR,
  "react/jsx-boolean-value": [ERROR, "always"],
  "react/jsx-fragments": ERROR,
  "react/react-in-jsx-scope": OFF,
  "react/jsx-uses-react": OFF,
  "react-native/no-color-literals": OFF,
  "react-native/no-inline-styles": OFF,
  "react/jsx-handler-names": OFF,
  "react/jsx-key": ERROR,
  "react/jsx-no-leaked-render": ERROR,
  "react/jsx-no-useless-fragment": ERROR,
  "react/jsx-sort-props": ERROR,
  "react/prop-types": OFF,
  "react-hooks/exhaustive-deps": OFF,
};

const ESLINT_RULES = {
  "no-console": ERROR,
  "newline-after-var": ERROR,
  "object-shorthand": ERROR,
  "no-magic-numbers": [OFF],
};

const IMPORT_RULES = {
  "import/export": OFF,
  "import/newline-after-import": [ERROR, { count: COUNT }],
  "import/order": [
    ERROR,
    {
      groups: [
        "builtin",
        "external",
        "parent",
        "sibling",
        "internal",
        "index",
        "object",
      ],
      pathGroups: [
        {
          pattern: "{react,react-native,recoil,recoil-nexus,}",
          group: "external",
          position: "before",
        },
        {
          pattern: "{components/**,modules,components/**}",
          group: "parent",
          position: "before",
        },
        {
          pattern: "{screens/**,modules,screens/**}",
          group: "parent",
          position: "before",
        },
        {
          pattern: "{assets/**,constants/**}",
          group: "parent",
          position: "before",
        },
        {
          pattern: "{helpers/**,services/**,navigators/**,store/**,}",
          group: "parent",
          position: "before",
        },
        {
          pattern: "{hooks/**,modules,hooks/**}",
          group: "parent",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: ["react", "react-native", "builtin"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: false,
      },
    },
  ],
};

module.exports = {
  env: {
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "plugin:react/recommended",
  ],
  plugins: ["react", "react-native", "import"],
  settings: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    react: {
      version: "detect",
    },
    "import/ignore": ["react"],
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
  rules: {
    ...REACT_RULES,
    ...ESLINT_RULES,
    ...IMPORT_RULES,
  },
};
