import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
      parserOptions: {
        // Pindahkan parserOptions di sini
        ecmaVersion: "latest", // atau 2022, 2021, dll. sesuai kebutuhan
        sourceType: "module",
      },
    },
    files: ["**/*.mjs"],
  },
  {
    ...pluginJs.configs.recommended,

    // Hapus parserOptions di sini
  },
];
