# 🗺️ Context File — Your GPS for Today's Session
> **Update this file at the START and END of every coding session.**  
> This tells AI exactly where you are and what's already done so it never repeats or breaks existing work.

---

## 📍 Current Status
> Update this every session before you start prompting AI

**Current Phase:** Phase ___ — [phase name here]  
**Last Updated:** [date]  
**Last Thing Completed:** [describe the last thing you finished]  
**Next Thing To Do:** [describe exactly what you're working on today]

---

## ✅ What's Already Built
> Check off as you go. AI should NEVER rewrite these unless you explicitly ask.

- [ ] Angular project created with `ng new`
- [ ] Angular Material installed and themed
- [ ] ng2-charts and chart.js installed
- [ ] App routing set up (all 6 routes exist)
- [ ] `expense.model.ts` and `profile.model.ts` created
- [ ] `categories.ts` constants file created
- [ ] `StorageService` built (read/write localStorage)
- [ ] `ExpenseService` built (add, delete, get expenses, get totals)
- [ ] `SetupComponent` — form works, saves to localStorage
- [ ] `DashboardComponent` — stat cards and progress bars render
- [ ] `AddExpenseComponent` — form works, expense saves correctly
- [ ] `TransactionsComponent` — list shows, filter works, delete works
- [ ] `AnalyticsComponent` — horizontal bar chart renders
- [ ] `AnalyticsComponent` — line chart renders
- [ ] `SummaryComponent` — health score calculates and displays
- [ ] Deployed to Vercel

---

## 🏗️ Current Architecture Decisions
> Update this when you or AI makes a structural decision

| Decision | What Was Decided | Why |
|----------|-----------------|-----|
| State management | Service-based (no NgRx) | Simpler for this level |
| Storage | localStorage only | No backend needed |
| Forms | Reactive Forms | Better for validation and control |
| Routing | Standard Angular Router with lazy loading | Performance + best practice |

---

## 📂 Files That Exist Right Now
> Keep this updated so AI knows what files are already created

```
[List your actual files here as you create them]
Example:
- src/app/core/services/expense.service.ts ✅
- src/app/core/services/storage.service.ts ✅
- src/app/features/dashboard/dashboard.component.ts ✅
- src/app/features/add-expense/add-expense.component.ts 🚧 (in progress)
```

---

## 🧩 Key Interfaces (Data Shapes)
> So AI always generates code with the correct data structure

### Expense
```typescript
export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;        // format: 'YYYY-MM-DD'
  note: string;
}
```

### UserProfile
```typescript
export interface UserProfile {
  salary: number;
  budgets: {
    [category: string]: number;
  };
}
```

### CategoryConfig
```typescript
export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}
```

---

## 🔁 How to Use This File with AI

**At the start of every session, paste this prompt:**

> "Read my context file first. Here it is: [paste this whole file]. I am currently working on [describe today's task]. Do not rewrite anything marked as already built. Here is my question / task: [your actual question]"

**At the end of every session, update:**
1. The "Current Status" section at the top
2. The "What's Already Built" checklist
3. The "Files That Exist Right Now" list
4. Any new architecture decisions made
