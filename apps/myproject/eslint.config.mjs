import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import ngrx from "@ngrx/eslint-plugin/v9";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  /* ---------------------------------------------
   * Global ignores
   * --------------------------------------------- */
  globalIgnores([
    "**/node_modules/**",
    "**/.angular/**",
    "**/dist/**",
    "**/coverage/**",
    "**/*.js",
  ]),

  /* ---------------------------------------------
   * TypeScript / Angular
   * --------------------------------------------- */
  {
    files: ["**/*.ts"],

    extends: [
      ...compat.extends(
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ),
      ...ngrx.configs.signals,
    ],

    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        // 👇 THIS IS THE KEY FIX
        project: ["apps/*/tsconfig*.json"],
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: ["apps/*/tsconfig*.json"],
        },
      },
    },

    rules: {
      "prefer-const": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // Relax unsafe rules (common for Angular)
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      // Angular
      "@angular-eslint/no-output-on-prefix": "off",

      // Imports
      "import/no-cycle": [
        "warn",
        {
          maxDepth: 1,
          ignoreExternal: true,
        },
      ],
    },
  },

  /* ---------------------------------------------
   * Angular templates
   * --------------------------------------------- */
  {
    files: ["**/*.html"],
    extends: compat.extends("plugin:@angular-eslint/template/recommended"),
  },
]);
