# 🚗 Tech Stack Doc — The Vehicle You're Driving
> **Update this file every time a package, version, or tool decision changes.**  
> Last Updated: [UPDATE THIS DATE WHEN YOU CHANGE ANYTHING]

---

## 🧱 Core Framework

| Tool | Version | Why |
|------|---------|-----|
| Angular | 17+ | Core framework |
| TypeScript | 5.x | Comes with Angular |
| Node.js | 18+ LTS | Required to run Angular CLI |
| Angular CLI | Latest | Project scaffolding and build |

---

## 📦 Key Dependencies

| Package | Version | Used For |
|---------|---------|----------|
| `@angular/material` | 17+ | UI components (buttons, forms, dialogs, progress bars) |
| `@angular/cdk` | 17+ | Comes with Angular Material |
| `ng2-charts` | 5.x | Horizontal bar chart + line chart on Analytics page |
| `chart.js` | 4.x | Required peer dependency for ng2-charts |
| `uuid` | 9.x | Generating unique IDs for each expense |

---

## 🛠️ Dev Tools

| Tool | Used For |
|------|----------|
| VS Code | Code editor |
| Angular DevTools (Chrome ext) | Debugging components |
| Git + GitHub | Version control |
| Vercel | Deployment (free tier) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── expense.service.ts       ← All data logic lives here
│   │   │   └── storage.service.ts       ← All localStorage read/write
│   │   └── models/
│   │       ├── expense.model.ts         ← Expense interface
│   │       └── profile.model.ts         ← Profile/salary interface
│   ├── features/
│   │   ├── setup/
│   │   │   └── setup.component.ts/html/scss
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts/html/scss
│   │   ├── add-expense/
│   │   │   └── add-expense.component.ts/html/scss
│   │   ├── transactions/
│   │   │   └── transactions.component.ts/html/scss
│   │   ├── analytics/
│   │   │   └── analytics.component.ts/html/scss
│   │   └── summary/
│   │       └── summary.component.ts/html/scss
│   ├── shared/
│   │   ├── components/
│   │   │   ├── category-bar/            ← Reusable progress bar per category
│   │   │   ├── stat-card/               ← Reusable stat box (income/spent/saved)
│   │   │   └── expense-row/             ← Reusable row in transactions list
│   │   ├── constants/
│   │   │   └── categories.ts            ← Category list with icons and colors
│   │   └── pipes/
│   │       └── currency-inr.pipe.ts     ← Format numbers as ₹ currency
│   ├── app.routes.ts                    ← All route definitions
│   ├── app.component.ts                 ← Root component with nav
│   └── app.config.ts                    ← App-level providers
├── styles.scss                          ← Global styles + theme
└── index.html
```

---

## 🎨 UI Approach

- **Component Library:** Angular Material for form fields, buttons, dialogs, progress bars
- **Charts:** ng2-charts (wrapper for Chart.js)
- **Custom Styling:** SCSS per component for layout and color overrides
- **Color Theme:** Custom Angular Material theme defined in `styles.scss`
- **Icons:** Angular Material Icons (mat-icon) — no extra icon library needed

---

## 🔄 State Management

- **No NgRx** — too complex for this project level
- All shared state lives in `ExpenseService`
- Components read from the service, not from each other
- localStorage is the single source of truth — service reads from it on init

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run dev server
ng serve

# Build for production
ng build

# Deploy to Vercel (first time)
npx vercel
```

---

## ⚠️ Change Log
> Add a row every time you install a new package or change a version

| Date | Change | Reason |
|------|--------|--------|
| [date] | Initial setup | Project start |
