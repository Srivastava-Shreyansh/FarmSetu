import { ESLint } from "eslint";

(async function main() {
  const eslint = new ESLint({
    overrideConfig: {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: { ecmaFeatures: { jsx: true } }
      },
      rules: { "no-undef": "error", "react/jsx-no-undef": "error" }
    }
  });

  const results = await eslint.lintFiles(["src/**/*.jsx"]);
  const formatter = await eslint.loadFormatter("stylish");
  console.log(formatter.format(results));
})().catch(console.error);
