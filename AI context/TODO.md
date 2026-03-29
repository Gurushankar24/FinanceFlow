# ✅ TODO — Phase-by-Phase Build Tracker
> **Tick off each item as you complete it. Never skip a phase — each one builds on the last.**

---

## 🟦 Phase 1 — Project Setup & Foundation
> Goal: Have a running Angular app with routing and folder structure ready

- [ ] Create Angular project: `ng new finance-flow`
- [ ] Install Angular Material: `ng add @angular/material`
- [ ] Choose and apply a Material theme (Indigo/Pink or custom)
- [ ] Install ng2-charts and chart.js: `npm install ng2-charts chart.js`
- [ ] Install uuid: `npm install uuid` and `npm install --save-dev @types/uuid`
- [ ] Create folder structure (core, features, shared) as defined in TECH_STACK.md
- [ ] Create all 6 feature component folders with empty components
- [ ] Set up all 6 routes in `app.routes.ts`
- [ ] Add basic navigation links in `app.component.html`
- [ ] Confirm all routes work in browser (even empty pages)

**Phase 1 Complete? [ yes ]** — Date completed: phase 1 is complete___

---

## 🟦 Phase 2 — Data Layer
> Goal: All data models, constants, and services are ready before building any UI

### Models
- [ ] Create `src/app/core/models/expense.model.ts` with `Expense` interface
- [ ] Create `src/app/core/models/profile.model.ts` with `UserProfile` interface

### Constants
- [ ] Create `src/app/shared/constants/categories.ts` with all 8 categories (name, icon, color)

### Services
- [ ] Create `StorageService` with `getItem()` and `setItem()` methods for localStorage
- [ ] Create `ExpenseService` with these methods:
  - [ ] `getProfile()` — reads profile from localStorage
  - [ ] `saveProfile(profile)` — saves profile to localStorage
  - [ ] `getExpenses()` — reads all expenses from localStorage
  - [ ] `addExpense(expense)` — adds expense and saves array
  - [ ] `deleteExpense(id)` — removes expense by id and saves array
  - [ ] `getExpensesByMonth(month, year)` — returns filtered expenses
  - [ ] `getTotalSpentByCategory(month, year)` — returns object with totals per category
  - [ ] `getRemainingBudget(category, month, year)` — returns leftover budget for category
  - [ ] `getHealthScore(month, year)` — calculates score out of 100

**Phase 2 Complete? [ yes ]** — Date completed: ___

---

## 🟦 Phase 3 — Setup Page
> Goal: User can enter salary + budgets and it saves correctly

- [ ] Build Setup form with Reactive Forms
- [ ] Salary input field with required validation
- [ ] Budget input for each of the 8 categories
- [ ] On submit: save to localStorage via `ExpenseService`
- [ ] After save: redirect to Dashboard
- [ ] On app load: if profile already exists, skip setup and go to Dashboard

**Phase 3 Complete? [ ]** — Date completed: ___

---

## 🟦 Phase 4 — Dashboard Page
> Goal: Main screen shows live financial status

### Shared Components (build these first, reuse everywhere)
- [ ] Build `StatCardComponent` — takes title + value as `@Input()`, displays a styled card
- [ ] Build `CategoryBarComponent` — takes category name, spent amount, budget limit as `@Input()`, shows colored progress bar

### Dashboard
- [ ] Show 3 stat cards: Monthly Income | Total Spent | Total Saved
- [ ] Show one `CategoryBarComponent` for each of the 8 categories
- [ ] Color logic works: green / yellow / red based on percentage
- [ ] All values update from live localStorage data on page load

**Phase 4 Complete? [ ]** — Date completed: ___

---

## 🟦 Phase 5 — Add Expense Page
> Goal: User can log a new expense that appears everywhere

- [ ] Category dropdown (populated from categories constants)
- [ ] Amount number input with min: 1 validation
- [ ] Date picker (defaults to today)
- [ ] Note text input (optional)
- [ ] Form validation — show error messages for required fields
- [ ] On submit: call `addExpense()` in service, reset form, show success message
- [ ] Build `ExpenseRowComponent` — reusable row for transactions list

**Phase 5 Complete? [ ]** — Date completed: ___

---

## 🟦 Phase 6 — Transactions Page
> Goal: User can see and manage all past expenses

- [ ] Display all expenses using `ExpenseRowComponent`
- [ ] Sort by date (newest first)
- [ ] Filter by category (dropdown)
- [ ] Filter by month (dropdown)
- [ ] Delete button per row — with Angular Material confirm dialog
- [ ] Empty state message when no expenses found

**Phase 6 Complete? [ ]** — Date completed: ___

---

## 🟦 Phase 7 — Analytics Page
> Goal: Visual charts showing spending patterns

- [ ] Horizontal bar chart — category on Y axis, amount spent on X axis, using ng2-charts
- [ ] Line chart — day of month on X axis, cumulative spending on Y axis
- [ ] Summary table below charts — Category | Budget | Spent | Difference
- [ ] Difference column colored green (under budget) or red (over budget)
- [ ] Month selector to change which month is displayed

**Phase 7 Complete? [ ]** — Date completed: ___

---

## 🟦 Phase 8 — Monthly Summary Page
> Goal: Snapshot of a full month with health score

- [ ] Month selector at top
- [ ] 3 stat cards: Total Income | Total Spent | Total Saved
- [ ] Health score displayed large (out of 100) with color
- [ ] Brief breakdown of which categories caused score deductions

**Phase 8 Complete? [ ]** — Date completed: ___

---

## 🟦 Phase 9 — Polish & Deploy
> Goal: App looks good and is live online

- [ ] Check app works on mobile screen sizes (responsive)
- [ ] Make sure navigation is clean and all routes work
- [ ] Handle edge cases: no expenses yet, budget not set, zero values
- [ ] Write a proper README.md with screenshots and live link
- [ ] Deploy to Vercel: `npx vercel`
- [ ] Add live link to README and GitHub

**Phase 9 Complete? [ ]** — Date completed: ___

---

## 🏁 Project Complete? [ ]
> Live URL: ___  
> GitHub URL: ___
