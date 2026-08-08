import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored from arc, byte-identical so it can be re-synced with `cp`.
    // Linting it would only pressure us to edit copies we want to keep pristine;
    // `tsc` still typechecks all of it.
    "lib/astrology/**",
    "lib/geocoding/**",
    "types/astrology.ts",
    "types/comprehensive-transits.ts",
  ]),
  // Vendored from poesis, kept byte-identical so the council can be re-synced
  // with `cp`. Poesis is a Next release behind, where these rules were not yet
  // errors; they flag existing patterns, not anything introduced here. Still
  // linted for everything else, and `tsc` typechecks all of it.
  {
    files: [
      "app/council/**",
      "components/council/**",
      "components/ModelSelect.tsx",
      "components/CustomModelModal.tsx",
    ],
    linterOptions: { reportUnusedDisableDirectives: "off" },
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);

export default eslintConfig;
