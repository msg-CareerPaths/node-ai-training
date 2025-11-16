# Repository Guidelines

## Project Structure & Module Organization

- `backend/src` – NestJS application source (modules, controllers, services, DTOs).
- `backend/test` – e2e and additional tests; unit specs live next to code in `src` as `*.spec.ts`.
- `backend/dist` – build output (do not edit generated files).
- `frontend/src` – Angular app (standalone components, routes, services).
- `frontend/public` – static frontend assets.
- `frontend/docs` – frontend documentation (for example, `best-practices.md`).
- `docker` – Dockerfiles and compose assets for local and production containers.

## Build, Test, and Development Commands

- Backend: `cd backend && npm install` – install dependencies.
- Backend: `cd backend && npm run start:dev` – run the API in watch mode.
- Backend: `cd backend && npm run build` – compile TypeScript to production-ready JS in `dist`.
- Backend: `cd backend && npm run test` – run Jest unit and e2e tests.
- Backend: `cd backend && npm run lint` – run ESLint (with auto-fix where configured).
- Frontend: `cd frontend && npm install` – install Angular dependencies.
- Frontend: `cd frontend && npm start` – serve the app locally with live reload.
- Frontend: `cd frontend && npm run build` – create a production build.
- Frontend: `cd frontend && npm test` – run Angular unit tests (Jasmine/Karma).

## Coding Style & Naming Conventions

- Use TypeScript with 2-space indentation across backend and frontend.
- Name backend classes with `PascalCase` and suffix Nest artifacts (for example, `UserModule`, `AuthService`, `UserController`); use `camelCase` for variables, functions, and methods.
- Run `cd backend && npm run format` before pushing to apply Prettier; ensure `npm run lint` passes without new warnings.
- In `frontend`, follow the Angular style guide: group files by feature, use `kebab-case` for file/folder names, and keep one top-level class per file.
- Use the workspace Prettier configuration for frontend `.ts` and `.html` files (via your editor or `npx prettier`).

## Testing Guidelines

- Backend: Jest is the testing framework; unit specs live alongside code in `backend/src` as `*.spec.ts`.
- Backend: e2e tests live under `backend/test` (for example, `backend/test/app.e2e-spec.ts`). Use `cd backend && npm run test:cov` to track coverage.
- Frontend: Angular tests use Jasmine/Karma; specs live next to components in `frontend/src` as `*.spec.ts`. Run `cd frontend && npm test`.
- Keep all tests deterministic and isolated; prefer fast unit tests for business logic and critical UI flows.

## Angular Frontend Guidelines

- Follow `frontend/docs/best-practices.md` and the official Angular style guide for structure and naming.
- Keep components small and focused on a single responsibility. Separate into `Pages` and `Containers` the components for a feature.
- Use `Tailwind` classes for any kind of layout logic inside the template.
- Use standalone components (no NgModules) and signals for state; do not set `standalone: true` explicitly in decorators.
- Use `input()`/`output()` functions, `computed()` for derived state, and `ChangeDetectionStrategy.OnPush` in components.
- Avoid `@HostBinding`/`@HostListener`; configure host bindings in the `host` object of `@Component`/`@Directive`.
- Use `NgOptimizedImage` for static images (not for inline base64); prefer lazy-loaded feature routes.
- Templates: use Angular’s control flow (`@if`, `@for`, `@switch`), avoid complex logic, and do not use `ngClass`/`ngStyle`, arrow functions, or regex in templates.
- State: use signals with `set`/`update` (never `mutate`), keep transformations pure, and design services with a single responsibility using `inject()` and `providedIn: 'root'`.
- Favor using `Angular Material` components when you can, do not create new ones.
- 
## Commit & Pull Request Guidelines

- Write concise, present-tense commit messages (for example, `feat(auth): add login endpoint`, `fix(user): handle missing profile`).
- For pull requests, include a brief summary, implementation notes, test commands/results, and links to related issues.
- If you change API behavior or configuration, update relevant docs in `backend` or `frontend` (for example, READMEs or config examples) and mention these updates in the PR description.

## Configuration & Security

- Use `.development.env` in `backend` for local development; never commit secrets or environment-specific overrides.
- Prefer configuration via `@nestjs/config` and TypeORM configuration files instead of hard-coded values.
- Review environment handling, CORS, and database settings before deploying to new environments.

