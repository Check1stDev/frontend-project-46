import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  {
  files: ["**/__tests__/**/*.js", "**/*.test.js", "**/*.spec.js"],
  languageOptions: {
    globals: { ...globals.node, ...globals.jest },
  },
},
]);
