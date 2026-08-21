import { ESLint } from "eslint";

(async function main() {
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      env: { browser: true, es2021: true },
      rules: { "no-undef": "error", "react/jsx-no-undef": "error" }
    }
  });

  const results = await eslint.lintFiles(["src/**/*.jsx"]);
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
