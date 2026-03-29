# 🐛 Error Log — AI Self-Correction Document
> **Every time AI makes a mistake and you fix it, log it here.**  
> At the start of each session, paste this file to AI so it never repeats the same mistakes.

---

## 📌 How to Use This File

**When an error happens:**
1. Paste the error message or describe what went wrong
2. Ask AI to fix it AND add it to this error log
3. Next session: paste this file at the start so AI reads it first

**Paste this at the start of every AI session:**
> "Before you write any code, read my error log and make sure you do not repeat any of these mistakes: [paste this file]"

---

## 🔴 Active Errors (Not Yet Fixed)
> Move to Resolved once fixed

| # | Error | Where It Happened | Status |
|---|-------|------------------|--------|
| — | No errors yet | — | — |

---

## ✅ Resolved Errors
> Keep these here forever — they teach AI what NOT to do in this project

---
### Template: How to log an error

**Error #[number]**  
**Date:** [date]  
**Phase:** Phase [X]  
**Component/File:** `[filename]`

**What Happened:**
[Describe what went wrong in plain English]

**Error Message (if any):**
```
[paste the exact error from terminal or browser console]
```

**What AI Did Wrong:**
[Explain what mistake AI made]

**The Fix:**
```typescript
// Paste the corrected code here
```

**Rule Going Forward:**
> In this project, always [describe the rule AI must follow to avoid this again]

---

## 📋 Project-Specific Rules AI Must Always Follow
> This grows over time as you encounter patterns. These are non-negotiable rules for this codebase.

### Angular Rules
- Always use **Reactive Forms** not Template Driven forms — this project only uses `ReactiveFormsModule`
- Always inject services using the `inject()` function in Angular 17+, not constructor injection
- Always use `standalone: true` components — this project does NOT use NgModules
- Always import Angular Material modules inside the component's `imports: []` array, not a shared module

### Data Rules
- Always use the `Expense` and `UserProfile` interfaces from `/core/models/` — never create inline types
- Always use `ExpenseService` to read/write data — never access localStorage directly from a component
- The `date` field on an expense is always a string in format `'YYYY-MM-DD'` — never a Date object

### Chart Rules
- [To be filled as you build the Analytics page]

### Styling Rules
- Always use Angular Material components for form inputs — never plain HTML `<input>` tags
- Progress bar color is controlled by adding CSS classes (`success`, `warning`, `danger`) not inline styles

---

## 🔁 Common Angular 17 Mistakes to Avoid
> Pre-filled based on known common issues — update if any don't apply

**Mistake 1 — Forgetting to import standalone component dependencies**
Wrong: adding a component to a module  
Right: adding it to the `imports: []` array of the standalone component that uses it

**Mistake 2 — Using `ngModel` without importing `FormsModule`**
This project uses Reactive Forms only. Never use `ngModel` or `[(ngModel)]`.

**Mistake 3 — Calling localStorage directly**
Always go through `StorageService`. Direct localStorage calls make testing and debugging harder.

**Mistake 4 — Mutating arrays directly**
Wrong: `this.expenses.push(newExpense)`  
Right: `this.expenses = [...this.expenses, newExpense]` then save to storage

**Mistake 5 — Not handling the case where localStorage is empty**
Always check for null before parsing: `const data = localStorage.getItem(key); return data ? JSON.parse(data) : null;`
