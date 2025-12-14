---
description: "Best practices and instructions for Node development in projects."
---
# Node.js Development Instructions

  ## Project Structure
  - Use `src/` directory for source code, not root-level files
  - Place tests in `__tests__/` directories next to files or in a top-level `tests/` folder
  - Keep configuration files in root (package.json, tsconfig.json, etc.)
  - Use `dist/` or `build/` for compiled output (gitignore these)
  - Separate concerns: `/src/routes`, `/src/services`, `/src/utils`, `/src/models`

  ## Package Management
  - **Use pnpm** as the default package manager (no lockfile conflicts in teams)
  - Pin Node version in package.json: `"engines": { "node": ">=20.0.0" }`
  - Use `.nvmrc` file for local development: `echo "20" > .nvmrc`

  ## Build System Setup
  - **TypeScript**: Use `tsup` for fast bundling with zero-configjson
    "scripts": {
      "build": "tsup src/index.ts --format esm,cjs --dts",
      "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
    }
    - **ESM-first**: Set `"type": "module"` in package.json
  - **Dual packages**: Build both ESM and CommonJS when publishing libraries

  ## Essential Scripts Conventionjson
  {
    "scripts": {
      "dev": "tsx watch src/index.ts",
      "build": "tsup",
      "test": "vitest run",
      "test:watch": "vitest",
      "test:ui": "vitest --ui",
      "lint": "eslint . --ext .ts,.js",
      "lint:fix": "eslint . --ext .ts,.js --fix",
      "format": "prettier --check .",
      "format:fix": "prettier --write .",
      "typecheck": "tsc --noEmit",
      "prepare": "husky install",
      "prepublishOnly": "pnpm build && pnpm test"
    }
  }
  ## Testing Strategy
  - **Use Vitest** (faster than Jest, ESM-native, compatible syntax)
  - Place test files next to source: `user.ts` → `user.test.ts`
  - Use descriptive test names: "should return 400 when email is invalid"
  - Aim for >80% coverage on critical paths
  - Use `msw` for API mocking, `@testing-library` for component tests

  ## Environment Management
  - Use `.env.local` for local development (gitignored)
  - Use `.env.example` for required variables (committed)
  - Validate env vars at startup using `zod`:typescript
    import { z } from 'zod';

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      PORT: z.coerce.number().default(3000),
      DATABASEURL: z.string().url()
    });
    
    export const env = envSchema.parse(process.env);
    ```

  ## Linting & Formatting
  - **ESLint**: Use `eslint-config-love` (Standard JS + TypeScript rules)
  - **Prettier**: Default config is fine, add `.prettierignore`
  - Enable lint-staged with Husky for pre-commit hooks
  - Use `@typescript-eslint` with type-aware rules for better type safety

  ## Git Workflow
  - Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
  - Setup Husky pre-commit hooks:
    ```bash
    npx husky-init && pnpm install
    npx husky add .husky/pre-commit "npx lint-staged"
    ```
  - Configure lint-staged in package.json:
    ```json
    "lint-staged": {
      "*.{ts,js}": ["eslint --fix", "prettier --write"]
    }
    ```

  ## Dependencies Management
  - Separate dev vs prod dependencies correctly
  - Use `tsx` for TypeScript execution in dev (no build step needed)
  - Prefer smaller, focused packages over monolithic ones
  - Check bundle size with `pnpm build && npx pkg-size`

  ## Security
  - Never commit secrets or keys
  - Use `dotenv` for local environment variables only
  - Implement rate limiting and input validation
  - Keep dependencies updated: `pnpm update` weekly
  - Use `helmet` middleware for Express/Fastify apps

  ## Performance
  - Use `workerthreads` for CPU-intensive operations
  - Implement streaming for large data processing
  - Monitor memory usage in production with clinic.js

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

