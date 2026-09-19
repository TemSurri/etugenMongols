// Test-only loader: use the project's TypeScript compiler and Node's test runner.
// Nothing in this file is imported by Vite or the application.
import { registerHooks } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && context.parentURL) {
      const url = new URL(specifier, context.parentURL);
      if (!/\.[a-z]+$/i.test(url.pathname) && existsSync(fileURLToPath(url) + ".ts")) {
        return nextResolve(url.href + ".ts", context);
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts") && !url.includes("/node_modules/")) {
      const source = readFileSync(fileURLToPath(url), "utf8")
        .replaceAll("import.meta.env", '({VITE_API_URL: "http://localhost:8080"})');
      return {
        format: "module", shortCircuit: true,
        source: ts.transpileModule(source, {
          compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
          fileName: fileURLToPath(url),
        }).outputText,
      };
    }
    return nextLoad(url, context);
  },
});
