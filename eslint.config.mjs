import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      // Specific files with lint issues
      "components/workflow-builder/node-connection.tsx",
      
      // Build directories
      ".next/**/*",
      "out/**/*",
      "build/**/*",
      "dist/**/*",
      
      // Node modules
      "node_modules/**/*"
    ]
  },
  
  // Base configuration
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Custom rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off"
    }
  }
];

export default eslintConfig;
