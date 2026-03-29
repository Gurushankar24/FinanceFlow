# Finance Tracker Project Context

## Project Overview
Finance Tracker is a modern web application built with **Angular 21** and **TypeScript**. It is designed as a server-side rendered (SSR) application using Angular's latest hydration features. The project uses **Vite** as its build tool and **Tailwind CSS v4** for styling.

### Tech Stack
- **Framework:** Angular 21.1.0
- **Language:** TypeScript 5.9
- **Build Tool:** Vite (integrated via `@angular/build`)
- **Styling:** Tailwind CSS v4.1.12 with PostCSS
- **Testing:** Vitest 4.0.8
- **Server:** Express 5.1.0 (for SSR)
- **Runtime:** Node.js (packageManager: npm@11.6.2)

### Architecture
- **Source Structure:** Follows standard Angular CLI structure under the `finance-tracker/src` directory.
- **SSR/Prerendering:** Enabled via `src/server.ts`, `main.server.ts`, and `app.config.server.ts`.
- **State Management:** Utilizes Angular Signals (seen in `app.ts`).
- **Routing:** Configured in `app.routes.ts` (currently empty placeholder).

---

## Building and Running

### Development Commands
- **Start Development Server:** `npm start` or `ng serve` (Runs at http://localhost:4200)
- **Build Project:** `npm run build` or `ng build` (Output in `dist/finance-tracker`)
- **Run Unit Tests:** `npm test` or `ng test` (Uses Vitest)
- **Watch Mode:** `npm run watch` (Builds with watch for development)
- **Run SSR Server:** `npm run serve:ssr:finance-tracker`

---

## Development Conventions

### Coding Style
- **Strict TypeScript:** `strict: true` is enabled in `tsconfig.json`.
- **Angular Templates:** `strictTemplates: true` is enabled for template type checking.
- **Formatting:** Prettier is configured in `package.json` with a print width of 100 and single quotes.
- **Components:** Uses standalone components (implied by Angular 21 defaults and `App` component structure).
- **Styling:** Tailwind CSS is imported in `src/styles.css` using the `@import "tailwindcss";` syntax (Tailwind v4 style).

### Testing Practices
- **Unit Testing:** Vitest is the primary test runner.
- **Test Files:** Follow the `*.spec.ts` naming convention.

### Contribution Guidelines (Inferred)
- Use Angular Signals for reactive state where possible.
- Adhere to the defined Prettier configuration for code consistency.
- Maintain strict type safety across the application.
