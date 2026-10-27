# ShelfBox — Project Context

> **Purpose:** This document is the canonical, AI-agnostic context for the ShelfBox project. It defines the product scope, architectural principles, technology stack, development conventions, engineering workflow, and known project status.
>
> **Last reviewed:** 2026-10-08
> **Project repository:** https://github.com/Wectornanime/shelfbox
> **Current milestone:** MVP release `v0.1.0`
> **Document language:** English, to facilitate use with different AI models and development tools.

---

## 1. Project Overview

### 1.1 What is ShelfBox?

ShelfBox is an Offline First Progressive Web App (PWA) for organizing and managing personal collections, initially focused on collectible miniatures.

The application allows users to create collections, register miniatures, associate images with items, and manage their collection through a responsive, app-like interface.

The initial implementation is intentionally local-first. Data is persisted in the browser using IndexedDB, accessed through Dexie.js, without requiring a backend or user account.

### 1.2 Product vision

ShelfBox starts as a miniature collection manager but should be designed so its domain and infrastructure can evolve without requiring a complete rewrite.

The long-term vision may include managing other types of collections, such as:

* Books.
* Video games.
* Music records and discs.
* Figures and other collectibles.

These are potential future directions, not requirements for the initial MVP.

### 1.3 Core product principles

1. **Offline First:** Core functionality must work without an internet connection after the application and its assets have been made available locally.
2. **Local data ownership:** The initial implementation stores collection data in the user's browser.
3. **Progressive Web App:** The application should offer an app-like experience and support installation where the platform allows it.
4. **Separation of concerns:** Domain rules must remain independent of UI frameworks and persistence technologies.
5. **Incremental evolution:** New abstractions and features must be justified by actual requirements.
6. **Maintainability:** Prefer clear, explicit code over clever or unnecessarily generic implementations.
7. **User experience:** Loading states, validation, error handling, empty states, and responsive layouts are part of the product, not optional polish.
8. **Technology replaceability:** Infrastructure should be replaceable without rewriting the domain and application layers.

---

## 2. MVP Scope

### 2.1 In scope

The initial MVP focuses on managing collections and their miniatures.

#### Collections

* Create a collection.
* List and retrieve collections.
* Edit collection information.
* Delete a collection, with explicitly defined handling of its associated miniatures.
* Store a collection name, optional icon, optional description, and timestamps.

#### Miniatures

* Create a miniature.
* List and retrieve miniatures.
* Edit miniature information.
* Delete a miniature.
* Associate a miniature with a collection.
* Store its name, optional description, brand, scale, images, and timestamps.
* Validate required fields and scale formatting.

#### Images

* Upload or select images through the supported UI.
* Display image previews.
* Associate images with miniatures.
* Replace or remove images when editing records.
* Avoid leaving obsolete image files or references after successful replacements or deletions.
* Keep image storage behind an application-level abstraction.

#### Application experience

* Navigate between application pages using client-side routing.
* Provide loading, error, validation, and empty states.
* Preserve data across application reloads.
* Support core workflows offline after initial asset caching.
* Provide a responsive interface suitable for desktop and mobile devices.

### 2.2 Explicitly out of scope for MVP

Do not implement the following unless the project owner explicitly changes the scope:

* User authentication and account management.
* A mandatory backend or API.
* Cloud synchronization.
* Multi-device data synchronization.
* Multi-user collaboration.
* Authorization and permissions systems.
* Microservices.
* Server-side image processing infrastructure.
* A generic collection engine for every possible category.
* Complex state management libraries without a demonstrated need.

Supabase, Firebase, or another backend may be evaluated later, but none is required for the initial local-first release.

### 2.3 MVP completion criteria

The MVP is ready for release when:

* Collection CRUD works end to end.
* Miniature CRUD works end to end.
* Collection-to-miniature relationships behave correctly.
* Image creation, replacement, and deletion are reliable.
* Data survives reloads.
* The application behaves correctly offline under the intended usage conditions.
* Main user flows provide clear loading, validation, empty, and error states.
* The production build succeeds.
* Automated checks pass.
* The application has been manually tested in a production-like environment.
* Release versioning and GitHub release procedures work as intended.

---

## 3. Technology Stack

### 3.1 Frontend

| Technology   | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| React        | Component-based UI                                        |
| TypeScript   | Static typing                                             |
| Vite         | Development server and production bundler                 |
| React Router | Client-side navigation                                    |
| HeroUI       | UI component library                                      |
| Tailwind CSS | Utility-first styling                                     |
| PWA tooling  | Service worker registration and application asset caching |

The project was initialized using the HeroUI Vite React template.

### 3.2 Persistence and image handling

| Technology / component    | Purpose                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| IndexedDB                 | Browser-native local database                                      |
| Dexie.js                  | IndexedDB wrapper and database API                                 |
| Repository Pattern        | Abstract persistence from application logic                        |
| ImageService              | Application-level image operations                                 |
| Image storage abstraction | Decouple image operations from a particular storage implementation |

The exact image persistence mechanism and its cleanup guarantees must be verified against the current source code before changing the implementation.

### 3.3 Testing and code quality

| Technology  | Purpose                                    |
| ----------- | ------------------------------------------ |
| Jest        | Automated tests                            |
| ts-jest     | TypeScript integration with Jest           |
| ESLint      | Static analysis and linting                |
| Husky       | Git hooks                                  |
| lint-staged | Run configured checks against staged files |
| npm         | Dependency and script management           |

The project uses `npm` and `package-lock.json` should be committed to version control.

### 3.4 Runtime and CI

* Node.js: `24.18.0` is the established development and CI baseline.
* Package manager: npm.
* CI platform: GitHub Actions.
* Repository hosting: GitHub.
* Deployment target: to be confirmed against the current project configuration.

Do not silently change the Node.js major version or CI runtime. Update the development environment, CI configuration, and documentation together when a version change is intentional.

---

## 4. Architecture

### 4.1 Architectural approach

ShelfBox follows a layered architecture inspired by Domain-Driven Design (DDD), using repositories and application use cases.

The intended dependency direction is:

```text
UI
 |
 v
Application
 |
 v
Domain

Infrastructure implements Domain contracts
and is connected through application composition.
```

A more concrete view:

```text
+--------------------------------------+
| UI                                   |
| Pages, components, hooks             |
+------------------+-------------------+
                   |
                   v
+--------------------------------------+
| Application                          |
| Use cases, orchestration, services    |
+------------------+-------------------+
                   |
                   v
+--------------------------------------+
| Domain                               |
| Entities, value objects, contracts   |
+--------------------------------------+

+--------------------------------------+
| Infrastructure                       |
| Dexie, IndexedDB, image persistence  |
+--------------------------------------+
                   |
                   v
       Browser storage and APIs
```

The diagram describes logical responsibilities, not a requirement that every dependency must be imported directly in this order. Infrastructure implementations must be connected to application use cases through explicit composition.

### 4.2 Domain layer

The domain layer contains the business concepts and rules.

It must not depend on:

* React or HeroUI.
* React Router.
* Dexie or IndexedDB.
* Browser-specific storage APIs.
* DOM elements.
* UI-specific error or state representations.

Domain entities, value objects, and repository contracts should remain framework-independent.

### 4.3 Application layer

The application layer coordinates domain operations through use cases.

Examples include:

* Creating a collection.
* Retrieving a collection.
* Updating a collection.
* Deleting a collection.
* Creating a miniature.
* Retrieving a miniature.
* Updating a miniature.
* Deleting a miniature.

Use cases should depend on domain contracts rather than concrete Dexie repositories.

Application-level services may coordinate operations involving multiple repositories or image storage.

### 4.4 Infrastructure layer

Infrastructure implements technical details such as:

* IndexedDB database access.
* Dexie database configuration.
* Repository implementations.
* Image persistence.
* Browser-specific integration.

Infrastructure should not become the location for business rules that belong in the domain or application layers.

### 4.5 UI layer

The UI contains pages, components, layouts, hooks, and user interaction logic.

UI components should not directly implement business rules or issue arbitrary Dexie queries.

User interactions should call application operations through the project's established composition and integration patterns.

### 4.6 Dependency injection and composition

Use an application composition root to connect concrete infrastructure implementations to the application layer.

A possible location is `src/app/compositions/`, subject to verification against the current repository.

Do not introduce a dependency injection framework solely to wire a small number of dependencies. Explicit object construction is sufficient unless the project demonstrates a need for something more elaborate.

---

## 5. Domain Model

The following describes the established initial domain concepts. The current source code is authoritative if implementation details differ.

### 5.1 Collection

Conceptual shape:

```typescript
interface Collection {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Expected semantics:

* `id`: unique identifier, generated using UUIDs.
* `name`: required collection name.
* `icon`: optional visual identifier.
* `description`: optional description.
* `createdAt`: creation timestamp.
* `updatedAt`: last-update timestamp.

Use the actual domain entity and value object implementations rather than introducing this interface if the repository already models the entity differently.

### 5.2 Miniature

Conceptual shape:

```typescript
type MiniatureBrand = "Hot Wheels" | "Maisto";

interface Miniature {
  id: string;
  collectionId: string;
  name: string;
  description?: string;
  brand: MiniatureBrand;
  scale: string;
  images: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Expected semantics:

* `id`: unique identifier.
* `collectionId`: identifier of the associated collection.
* `name`: required miniature name.
* `description`: optional description.
* `brand`: validated brand value.
* `scale`: validated scale representation.
* `images`: image-related data or reference; verify the actual storage representation before modifying it.
* `createdAt`: creation timestamp.
* `updatedAt`: last-update timestamp.

The current brand options are Hot Wheels and Maisto. Do not add brands, categories, or other classification systems without a product requirement.

### 5.3 Scale validation

The established scale validation uses the following regular expression:

```regex
^\s*1[:/]\d+\s*$
```

It accepts formats such as `1:64` and `1/64`, with optional surrounding whitespace.

Validation should remain centralized in the appropriate domain value object or validation component. Avoid duplicating slightly different regular expressions across UI components and use cases.

### 5.4 Relationships and deletion

A miniature belongs to a collection through `collectionId`.

Any collection deletion behavior must be explicit and tested. Do not assume that deleting a collection automatically deletes its miniatures unless that behavior is defined and implemented.

Likewise, image deletion and replacement must account for references and stored files. Avoid deleting an image before a replacement operation can safely complete if doing so could leave a valid record without its image.

---

## 6. Persistence and Offline First

### 6.1 Database

Dexie is used to access IndexedDB.

Known infrastructure files include:

```text
src/infrastructure/database/dexie/
├── instance.ts
├── schema.ts
└── ShelfBoxDatabase.ts
```

Repository implementations have included:

```text
src/infrastructure/repositories/dexie/
├── Collection.repository.ts
└── Miniature.repository.ts
```

These paths reflect the known project structure and must be verified against the current checkout before adding or moving files.

### 6.2 Persistence rules

* Do not access Dexie directly from domain entities or UI components.
* Use repository implementations for data access.
* Preserve domain independence from the underlying database.
* Handle missing records explicitly.
* Use consistent error semantics.
* Keep schema evolution and migrations in mind when changing persisted structures.
* Test database operations, especially updates, deletes, relationships, and missing records.

### 6.3 Offline behavior

The application registers a service worker through the PWA tooling in `main.tsx`.

The registration has used:

```typescript
registerSW({ immediate: true });
```

The implementation also guards service worker registration with a check for service worker support in the browser.

Offline support requires more than registering a service worker:

* Application assets must be available offline.
* Existing IndexedDB data must remain accessible.
* Core workflows must not require network requests.
* Image persistence must be verified independently of application asset caching.
* Updates must not unexpectedly invalidate access to local data.

Do not claim full offline reliability until the production build has been tested under realistic offline conditions.

---

## 7. Image Management

Images are a first-class concern because miniature records may contain associated photos.

The application uses an `ImageService` and an image storage abstraction to separate image operations from the rest of the domain.

Expected responsibilities include:

* Persisting image data or references.
* Retrieving images for display.
* Supporting previews.
* Replacing images.
* Removing images.
* Cleaning up obsolete image data when records are changed or deleted.

Important constraints:

1. Do not couple miniature domain entities to browser-specific image storage APIs.
2. Do not expose storage implementation details to UI components.
3. Keep image lifecycle operations consistent with record lifecycle operations.
4. Avoid orphaned images and broken references.
5. Handle failures without silently losing previously valid data.
6. Verify behavior with actual browser storage, not only mocked tests.

Before modifying this subsystem, inspect the current `ImageService`, its storage contract, and all relevant callers. Do not assume that `Miniature.images` necessarily contains a URL, a Blob, a filename, or an array without checking the implementation.

---

## 8. Project Structure and Naming

The repository has evolved over time. The following is a logical guide, not a guarantee that every directory currently exists.

```text
src/
├── app/
│   ├── compositions/
│   └── ...
├── domain/
│   ├── entities/
│   ├── valueObjects/
│   └── ...
├── infrastructure/
│   ├── database/
│   │   └── dexie/
│   └── repositories/
│       └── dexie/
├── styles/
└── ui/
    ├── components/
    ├── layouts/
    └── pages/
```

Known project history includes a local directory named `domian/`, which appears to be a spelling mistake for `domain/`. Verify the current checkout before correcting paths or imports.

### 8.1 Naming conventions

* TypeScript for application code.
* Use descriptive names that communicate responsibility.
* Use `.case.ts` for application use-case files, following the existing convention.
* Keep domain entities, value objects, repository contracts, and infrastructure implementations distinguishable.
* Follow the existing naming style of neighboring files rather than introducing a competing convention.
* Preserve consistent import aliases and path casing.
* Remove unused imports and variables.
* Avoid abbreviations unless they are widely understood in the project.

Previously used import aliases include:

```text
@/*
@app/*
@components/*
@pages/*
```

The active TypeScript and Vite configuration is authoritative for the aliases currently supported.

### 8.2 Configuration

The project uses TypeScript strict checking, including `noUnusedLocals` and `noUnusedParameters`.

The TypeScript configuration has used `moduleResolution: "bundler"`.

When changing imports, file paths, aliases, or configuration, verify that the changes work consistently in both development and production builds.

---

## 9. Testing Strategy

### 9.1 Existing approach

Jest is configured with `ts-jest` and a Node.js test environment.

The established test configuration has included:

```text
roots: ["src"]
collectCoverage: true
collectCoverageFrom:
  - "src/**/*.case.ts"
  - "!src/**/*.d.ts"
```

The test script has used:

```bash
jest --passWithNoTests
```

The `--passWithNoTests` option is a compatibility convenience, not evidence that the project has adequate test coverage.

### 9.2 Testing priorities

Prioritize tests in this order:

1. Domain validation and value objects.
2. Application use cases.
3. Repository implementations.
4. Image lifecycle operations.
5. Collection and miniature relationships.
6. UI workflows where the behavior is important.
7. Offline and persistence behavior in a real browser.

Existing work includes tests for use cases and Dexie repository behavior. Verify the current test files and actual coverage before treating any category as complete.

### 9.3 Quality expectations

* Test meaningful success and failure paths.
* Cover invalid input and missing records.
* Verify update and delete semantics.
* Verify image replacement and cleanup behavior.
* Do not rely exclusively on mocks for persistence correctness.
* Do not write tests merely to increase coverage percentages.
* Keep tests deterministic and isolated.

---

## 10. Development Commands

The project has used the following npm scripts:

| Script             | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| `npm run dev`      | Start the Vite development server                        |
| `npm run build`    | Run TypeScript compilation and create a production build |
| `npm run lint`     | Run ESLint                                               |
| `npm run lint:fix` | Automatically fix supported lint issues                  |
| `npm test`         | Run Jest tests                                           |

The production build has used:

```bash
tsc && vite build
```

The project also configures Husky and lint-staged.

Before executing commands, inspect `package.json` and use the scripts currently defined there. Do not assume the historical script list remains unchanged.

A typical local validation sequence is:

```bash
npm ci
npm run lint
npm test
npm run build
```

`npm ci` requires a valid committed `package-lock.json` consistent with `package.json`.

---

## 11. Git Workflow

### 11.1 Branch strategy

The intended branching model is:

```text
feature/* ─┐
fix/*      │
refactor/* ├──> dev ───> main
chore/*    │
docs/*     │
test/*     ┘
```

The branch names and protection rules must be enforced through repository settings and automation rather than relying exclusively on documentation.

### 11.2 Rules

* Do not push feature work directly to `main`.
* Do not push feature work directly to `dev`.
* Work in appropriately prefixed branches.
* Open pull requests from work branches into `dev`.
* Promote validated work from `dev` into `main` through a pull request.
* Treat `main` as the release branch.
* Require CI checks before merging where repository configuration supports it.
* Use Squash and Merge for work branches into `dev`, as intended by the project's workflow.
* Keep pull request titles consistent with Conventional Commits.
* Preserve a useful summary of the component commits in the pull request description when squash merging.

Husky has been used to block pushes from branches that do not match allowed prefixes. This is a local guard, not a substitute for GitHub branch protection.

### 11.3 Commit conventions

Use Conventional Commits, for example:

```text
feat(collection): add collection editing
fix(images): clean up replaced image data
refactor(domain): isolate scale validation
test(miniature): cover update use case
docs(architecture): document dependency rules
chore(ci): validate production build
```

Use the appropriate type and scope for the actual change. Avoid marking a change as `feat` if it is strictly a refactor or maintenance task.

---

## 12. CI/CD and Release Management

### 12.1 Continuous integration

The intended CI workflow runs for pull requests targeting `dev` and `main`.

Expected checks:

1. Checkout the repository.
2. Set up the established Node.js version.
3. Install dependencies with `npm ci`.
4. Run linting.
5. Run automated tests.
6. Run the production build.

A green CI run is a release prerequisite, not a guarantee that every user-facing behavior has been tested.

### 12.2 Release strategy

The project has explored a two-stage release workflow.

#### Release preparation on `dev`

The intended `release-prepare.yml` workflow:

* Determines the next version from Conventional Commits.
* Uses the previous release tag as the versioning baseline.
* Updates `package.json` and `package-lock.json` without creating a tag.
* Generates or updates `CHANGELOG.md`.
* Creates a release-preparation commit, for example:

```text
chore(release): v0.1.0 [skip ci]
```

* Avoids creating official Git tags or GitHub Releases on `dev`.
* Should be idempotent to prevent repeated version bumps.
* Must avoid infinite workflow loops caused by its own commits.

The exact triggers, permissions, and loop-prevention mechanism must be verified against the current workflow implementation.

#### Official release on `main`

The intended `release.yml` workflow:

* Reads the prepared package version.
* Creates the corresponding Git tag, such as `v0.1.0`.
* Creates a GitHub Release using that version and the prepared changelog.
* Does not create an unnecessary version-bump commit on `main`.

### 12.3 Initial release baseline

The project previously had a `package.json` version of `0.0.1`, and the absence of a corresponding `v0.0.1` tag was identified as a versioning concern.

The intended first MVP release is `v0.1.0`.

Before enabling automatic versioning, explicitly establish the initial release baseline and verify the versioning behavior when no previous tag exists.

Do not assume the first automatic version calculation will produce `0.1.0`.

### 12.4 Release principles

* Development activity must not create official production releases.
* Official tags and GitHub Releases belong to `main`.
* Release preparation should happen before promotion to `main`.
* Version updates must not repeat on every workflow run.
* A squash merge should be interpreted correctly by the chosen Conventional Commits tooling.
* Versioning behavior must be tested with representative commit types.
* Release automation must not bypass required CI checks.

The release workflow is a planned engineering capability until its current configuration and execution have been verified.

---

## 13. PWA and User Experience

The application aims to feel like a lightweight native application while remaining a web application.

Expected UX requirements:

* Responsive layouts.
* Consistent navigation.
* Clear page titles and actions.
* Accessible form labels and controls.
* Validation feedback near relevant fields.
* Loading indicators for asynchronous operations.
* Actionable error messages.
* Useful empty states.
* Confirmation for destructive actions when appropriate.
* Predictable behavior when editing and cancelling.
* Reliable image previews.
* Preservation of locally stored data during application updates.

Do not add UI complexity solely for visual novelty. Use the existing HeroUI and Tailwind conventions unless there is a concrete reason to introduce another component or styling approach.

---

## 14. Security, Reliability, and Data Ownership

Even without a backend, the application must handle user data responsibly.

* Treat imported files and image data as untrusted input.
* Validate input before persisting domain records.
* Avoid unnecessarily large image payloads.
* Handle browser storage errors and quota limitations.
* Do not assume browser storage is a durable backup.
* Do not claim that local data is automatically synchronized or recoverable.
* Avoid destructive schema changes without a migration strategy.
* Consider export and backup capabilities as future reliability improvements.

Because the initial MVP uses browser-local persistence, users may lose access to their data if browser storage is cleared or the browser removes the stored data. Backup and export are therefore potential future features, but they are not mandatory scope unless explicitly prioritized.

---

## 15. Engineering Rules for AI Assistants

Any AI assistant working on ShelfBox must follow these rules.

### 15.1 Inspect before modifying

Before proposing or implementing a change:

1. Inspect the relevant source files.
2. Check existing abstractions and naming conventions.
3. Read `package.json` and relevant configuration files when commands or tooling are involved.
4. Inspect tests before changing behavior.
5. Verify whether the requested feature already exists.
6. Distinguish actual implementation from assumptions based on this document.

This document provides context, not proof that every described file or feature currently exists.

### 15.2 Preserve architectural boundaries

* Keep the domain independent of React, Dexie, and browser APIs.
* Keep business rules out of UI components.
* Use application use cases to coordinate business operations.
* Use repository contracts for persistence.
* Implement storage details in infrastructure.
* Wire dependencies through explicit composition.
* Avoid circular dependencies between layers.

### 15.3 Avoid unnecessary complexity

Do not introduce:

* A new architectural pattern without a demonstrated benefit.
* A new dependency when existing tools are sufficient.
* Redux, Zustand, or another state manager without a clear need.
* A backend merely because the application is becoming more complete.
* Authentication or synchronization before they are required.
* Generic frameworks for a single straightforward use case.
* Duplicate abstractions that add no meaningful separation.
* Broad refactors unrelated to the requested task.

Prefer the smallest maintainable change that satisfies the requirement.

### 15.4 Maintain existing conventions

* Follow the existing code style.
* Use the current aliases and module conventions.
* Preserve strict TypeScript checking.
* Avoid unused imports and variables.
* Use Conventional Commits.
* Update tests and documentation when behavior changes.
* Do not silently change dependency versions or runtime requirements.

### 15.5 Validate changes

For meaningful changes:

* Run relevant automated tests.
* Run linting.
* Run the production build.
* Investigate failures rather than suppressing them.
* Report which checks were actually executed.
* Do not claim a test, build, deployment, or release succeeded unless it was verified.

If execution is unavailable, clearly identify what remains unverified.

### 15.6 Treat this document as maintainable project state

When a significant decision changes:

* Update this document.
* Record whether the change is implemented, planned, or deferred.
* Remove obsolete instructions.
* Avoid duplicating detailed API documentation that belongs in source code or dedicated documentation.
* Keep the document concise enough to remain useful as shared context across AI tools.

---

## 16. Current Project Status

**Status date:** 2026-10-08.

The following reflects known project history. It is not a live inspection of the repository.

### Established implementation

* React, TypeScript, and Vite foundation.
* HeroUI and Tailwind CSS.
* React Router.
* PWA service worker registration.
* Domain and infrastructure separation.
* Collection and miniature domain concepts.
* Dexie/IndexedDB persistence.
* Collection and miniature repository implementations.
* Application use cases.
* Image storage abstraction and `ImageService`.
* Jest and `ts-jest`.
* ESLint, Husky, and lint-staged.
* GitHub Actions CI and release automation have been part of the engineering work.

The existence of these components in the project history does not guarantee that all of them are complete, currently passing, or deployed.

### Known or previously identified work

* Finish and validate collection editing.
* Review collection and miniature CRUD end to end.
* Validate image replacement and cleanup.
* Review loading, error, and empty states.
* Test responsive layouts.
* Test offline behavior in a production build.
* Verify persistence after reload.
* Run lint, tests, and production build.
* Validate CI and release automation.
* Establish the initial release baseline.
* Produce the `v0.1.0` MVP release.

### Important verification items

* Confirm the current directory structure, including whether `domian/` has been corrected to `domain/`.
* Confirm all intended collection and miniature CRUD flows are complete.
* Confirm the current state of collection editing.
* Confirm the image storage mechanism and lifecycle guarantees.
* Confirm the actual test inventory and results.
* Confirm the current `package-lock.json` and Node.js setup.
* Confirm branch protection and required CI checks.
* Confirm release workflow triggers and idempotence.
* Confirm the initial versioning baseline.
* Confirm whether a production deployment already exists.

Do not mark an item complete solely because it appears in this historical context.

---

## 17. Immediate Roadmap

### Phase 1 — MVP hardening

1. Finish collection editing.
2. Verify collection CRUD.
3. Verify miniature CRUD.
4. Verify relationships and deletion semantics.
5. Verify image upload, replacement, and cleanup.
6. Complete loading, error, and empty states.
7. Check responsive behavior.
8. Test persistence after reload.
9. Test offline behavior.
10. Run lint, tests, and production build.

### Phase 2 — Release preparation

1. Inspect and finalize CI workflows.
2. Verify protected branch rules.
3. Establish the initial release baseline.
4. Test version calculation and changelog generation.
5. Verify that `dev` does not create official releases.
6. Verify that `main` creates the correct tag and GitHub Release.
7. Perform a final production-like smoke test.

### Phase 3 — MVP release

1. Promote the validated code through the intended pull request.
2. Create the `v0.1.0` release.
3. Deploy the application using the chosen hosting configuration.
4. Verify the deployed build and essential workflows.
5. Begin using ShelfBox and collect feedback.

### Phase 4 — Post-MVP evaluation

Prioritize future work using actual usage and reliability needs.

Potential candidates:

* Data export and backup.
* Improved image management.
* Sorting and filtering.
* Additional collection types.
* Better data portability.
* Cloud persistence or synchronization.

These are candidates, not commitments. Do not start Phase 4 work while critical MVP requirements remain incomplete.

---

## 18. Definition of Done

A change is complete when:

* [ ] The requested behavior is implemented.
* [ ] Existing architecture and domain boundaries are preserved.
* [ ] Relevant validation and error paths are handled.
* [ ] Relevant tests are added or updated.
* [ ] Linting passes.
* [ ] Tests pass.
* [ ] The production build succeeds.
* [ ] Documentation is updated when necessary.
* [ ] No unrelated refactoring or dependencies were introduced.
* [ ] Any unverified behavior is explicitly documented.

For an MVP release, the release-specific checks in Sections 2, 12, 16, and 17 must also be satisfied.

---

## 19. Guiding Principle

ShelfBox is a practical product, not an architecture experiment.

The architecture exists to make the application easier to maintain and evolve. It must not become an end in itself.

**Finish the MVP, validate it with real usage, and let actual requirements drive future complexity.**

When uncertain, prefer a small, explicit, tested solution that respects the existing domain boundaries over a speculative abstraction designed for hypothetical future needs.
