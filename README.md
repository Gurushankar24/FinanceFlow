# FinanceFlow

A personal budget tracking app built with **Angular 21**, **Chart.js**, and **Tailwind CSS**. Set your monthly salary, define category budgets, log expenses, and get a real-time health score on how well you're sticking to your budget — all stored locally in your browser.

 **[Live Demo → add-your-link-here](#)**

---

##  Demo

> *(Add GIFs here)*

---

##  Features

-  **Onboarding Setup** — Enter your monthly salary and set per-category budget limits on first launch
-  **Dashboard** — See total income, total spent, and total saved at a glance with per-category budget bars
-  **Add Expense** — Log expenses by category, amount, date, and note
-  **Transactions** — View and delete all logged expenses
-  **Analytics** — Interactive bar chart (spending per category) and cumulative line chart, filterable by month and year
-  **Monthly Summary** — Full breakdown of income vs spent vs saved with a budget comparison table
-  **Health Score** — A 0–100 score that penalises you for each category where you've exceeded your budget
-  **Persistent Storage** — All data saved in `localStorage`, survives page refreshes
-  **Edit Profile** — Update your salary and budgets anytime from the setup page
-  **SSR Ready** — Built with Angular SSR, storage handled safely with `isPlatformBrowser`

---

##  Tech Stack

| Category | Technology |
|---|---|
| Framework | Angular 21 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 + CSS |
| UI Components | Angular Material 21 |
| Charts | Chart.js 4 + ng2-charts |
| Forms | Angular Reactive Forms |
| Routing | Lazy-loaded standalone components |
| SSR | Angular SSR + Express 5 |
| Storage | localStorage via StorageService |
| Build Tool | Angular CLI 21 |
| Testing | Vitest + JSDOM |

---

##  Project Structure

```
src/
└── app/
    ├── core/
    │   ├── models/
    │   │   ├── expense.model.ts      # Expense interface (id, category, amount, date, note)
    │   │   └── profile.model.ts      # UserProfile interface (salary, budgets)
    │   └── services/
    │       ├── expense.service.ts    # All business logic (CRUD, health score, budgets)
    │       └── storage.service.ts    # SSR-safe localStorage wrapper
    ├── features/
    │   ├── setup/                    # Onboarding + edit profile page
    │   ├── dashboard/                # Monthly overview with category budget bars
    │   ├── add-expense/              # Add new expense form
    │   ├── transactions/             # Full transaction list with delete
    │   ├── analytics/                # Bar + line charts with month/year filter
    │   └── summary/                  # Monthly summary + health score
    └── shared/
        ├── components/
        │   ├── stat-card/            # Reusable income/spent/saved stat card
        │   └── category-bar/        # Per-category budget progress bar
        └── constants/
            └── categories.ts        # 8 expense categories with icons and colors
```

---

##  Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- Angular CLI

```bash
npm install -g @angular/cli
```

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/FinanceFlow.git
cd FinanceFlow

# Install dependencies
npm install

# Start the dev server
ng serve
```

Open your browser at `http://localhost:4200`

### Build for Production

```bash
ng build
```

Output will be in the `dist/` folder.

---

## 🏥 How the Health Score Works

The health score starts at **100** and deducts equal points for each category where your spending has exceeded the budget you set.

With 8 categories, each over-budget category costs **12.5 points**:

| Categories Over Budget | Health Score |
|---|---|
| 0 | 100 — Excellent |
| 1 | 87 — Good |
| 2 | 75 — Fair |
| 4 | 50 — Warning |
| 8 | 0 — Critical |

---

## Angular Concepts Showcased

- **Lazy Loading** — All 6 feature pages are lazy-loaded via `loadComponent`
- **Reactive Forms** — Setup page uses `FormBuilder`, `FormGroup`, and `Validators`
- **Standalone Components** — Full standalone API, no NgModules
- **SSR with isPlatformBrowser** — `StorageService` safely guards all `localStorage` access for server-side rendering
- **Dependency Injection** — Services injected with `inject()` throughout
- **Angular Material** — Form fields, selects, buttons, cards, icons
- **Chart.js + ng2-charts** — Bar and line charts with dynamic data binding

---


## Dev

**Gurushankar**
- LinkedIn: [linkedin.com/in/gurushankarv](https://www.linkedin.com/in/gurushankarv)
