---
description: "Best practices and instructions for TypeScript development in projects."
---
# TypeScript Development Instructions

  ## Project Structure
  - Use `src/` directory for source code, not root-level files
  - Place tests in `__tests__/` directories next to files or in a top-level `tests/` folder
  - Keep configuration files in root (package.json, tsconfig.json, etc.)
  - Use `dist/` or `build/` for compiled output (gitignore these)
  - Separate concerns: `/src/types`, `/src/utils`, `/src/services`, `/src/helpers`

  ## TypeScript Configuration
  - Use `tsconfig.json` with strict settings enabled
  - Set up path mapping for clean imports: `paths: { "@/*": ["./src/*"] }`
  - Always enable `strict: true` for type safety
  - Use `noUncheckedIndexedAccess: true` for extra array/tuple safety
  - Generate declaration files: `declaration: true` in compilerOptions
  - Configure proper outDir: `outDir: "./dist"`

  ## Type Management
  - Use `interface` for object shapes that might be extended
  - Use `type` for unions, intersections, and complex types
  - Prefer `unknown` over `any` - force type guards before usage
  - Use `satisfies` operator for type checking without widening
  - Create a `types.ts` file for shared type definitions
  - Use template literal types for string pattern validation

  ## Build System Setup
  - **Use `tsup`** for fast bundling with zero-config
    ```json
    "scripts": {
      "build": "tsup src/index.ts --format esm,cjs --dts",
      "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
    }
    ```
  - **ESM-first**: Set `"type": "module"` in package.json when possible
  - **Dual packages**: Build both ESM and CommonJS when publishing libraries
  - Generate source maps: `sourcemap: true` in tsconfig.json

  ## Essential Scripts Convention
  ```json
  {
    "scripts": {
      "dev": "tsx watch src/index.ts",
      "build": "tsup",
      "test": "vitest run",
      "test:watch": "vitest",
      "lint": "eslint . --ext .ts",
      "lint:fix": "eslint . --ext .ts --fix",
      "format": "prettier --check .",
      "format:fix": "prettier --write .",
      "typecheck": "tsc --noEmit",
      "typecheck:watch": "tsc --noEmit --watch",
      "prepare": "husky install",
      "prepublishOnly": "npm run build && npm test && npm run typecheck"
    }
  }
  ```

  ## Testing Strategy
  - **Use Vitest** (native TypeScript support, no config needed)
  - Place test files next to source: `user.ts` → `user.test.ts`
  - Use descriptive test names: "should return error when validation fails"
  - Type-check your tests: `tsc --noEmit`
  - Mock external APIs with `msw`
  - Aim for >80% coverage on critical type definitions and business logic

  ## Environment Management
  - Validate env vars at startup using `zod`
    ```typescript
    import { z } from 'zod';

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      API_URL: z.string().url()
    });
    
    export const env = envSchema.parse(process.env);
    ```
  - Use `.env.local` for local development (gitignored)
  - Use `.env.example` for required variables (committed)
  - Never commit secrets or API keys

  ## Linting & Formatting
  - **ESLint**: Use `@typescript-eslint/recommended-type-checked` rules
  - **Prettier**: Use default config with `.prettierignore`
  - Enable type-aware rules for better type safety
  - Enable strict null checks in both TS config and ESLint
  - Use `lint-staged` with Husky for pre-commit hooks

  ## Git Workflow
  - Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
  - Setup Husky pre-commit hooks:
    ```bash
    npx husky-init && npm install
    npx husky add .husky/pre-commit "npx lint-staged"
    ```
  - Configure lint-staged in package.json:
    ```json
    "lint-staged": {
      "*.ts": ["eslint --fix", "prettier --write", "tsc --noEmit"]
    }
    ```

  ## Dependencies Management
  - Separate dev vs prod dependencies correctly
  - Use `tsx` for TypeScript execution in dev (no build step needed)
  - Add `@types/*` packages for dependencies without built-in types
  - Check bundle size with `npm run build && npx pkg-size`
  - Audit dependencies: `npm audit` and fix regularly

  ## Type Safety Best Practices
  - Always enable `strictNullChecks` and `strictFunctionTypes`
  - Use `readonly` for immutable data structures
  - Never use `any` - use `unknown` and type guards instead
  - Use branded types for domain-specific validation (e.g., `type UserId = string & { readonly __brand: 'UserId' }`)
  - Enable `exactOptionalPropertyTypes` for stricter optional properties
  - Use `const` assertions for immutable literal types

  ## Publishing Libraries
  - Include `files` array in package.json to limit published files
  - Set `main`, `module`, and `types` fields correctly
  - Add `exports` field for modern entry points:
    ```json
    "exports": {
      ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/index.mjs",
        "require": "./dist/index.js"
      }
    }
    ```
  - Set `sideEffects: false` for tree-shaking optimization
  - Include `
