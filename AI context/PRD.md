# 📋 PRD — Product Requirements Document
> **The map of the whole city. Do not change this file unless the product vision changes.**

---

## 🎯 Product Overview

**App Name:** FinanceFlow  
**Type:** Personal Finance Tracker — Single Page Application  
**Framework:** Angular (latest)  
**Target User:** Anyone who wants to track monthly income vs expenses and see where their money goes visually  
**Data Storage:** localStorage (no backend, no login)

---

## 🗺️ Pages & Features

### Page 1 — Setup / Profile
- User enters their **monthly salary**
- User sets a **budget limit per category** (Food, Transport, Entertainment, Health, Shopping, Bills, Savings, Other)
- Data saved to localStorage on submit
- If setup is already done, redirect to Dashboard automatically
- User can come back to edit their salary and budgets anytime

### Page 2 — Dashboard (Home)
- Shows **salary at the top**
- Shows **total spent this month** and **remaining balance**
- One **horizontal progress bar per category** showing budget used vs limit
  - 🟢 Green — under 70% of budget
  - 🟡 Yellow — between 70%–90% of budget
  - 🔴 Red — over 90% or exceeded budget
- Quick summary stat cards: Total Income | Total Spent | Total Saved

### Page 3 — Add Expense
- Form fields: Category (dropdown), Amount (number), Date (date picker), Note (optional text)
- Validation: Category and Amount are required
- On submit: saves to expenses array in localStorage, resets form

### Page 4 — Transactions List
- List of all expenses, **newest first**
- Filter by **category** and by **month**
- Each row shows: category icon + color, amount, date, note
- **Delete** button per row (with confirmation)

### Page 5 — Analytics / Reports
- **Horizontal Bar Chart** — each category is a row, bar length = amount spent (easy to compare)
- **Line Chart** — day-by-day spending across the current month (shows spending pattern)
- **Summary Table** — Category | Budgeted | Spent | Difference (green = under, red = over)

### Page 6 — Monthly Summary
- Total Income, Total Spent, Total Saved for selected month
- **Financial Health Score** out of 100
  - Formula: start at 100, subtract points for every category over budget
  - Score displayed as a large number with a color (green/yellow/red)
- Month selector to view past months

---

## 🗂️ Categories (Fixed)

| Category     | Icon | Color   |
|--------------|------|---------|
| Food         | 🍔   | Orange  |
| Transport    | 🚗   | Blue    |
| Entertainment| 🎬   | Purple  |
| Health       | 💊   | Green   |
| Shopping     | 🛍️   | Pink    |
| Bills        | 💡   | Yellow  |
| Savings      | 💰   | Teal    |
| Other        | 📦   | Grey    |

---

## 💾 Data Structure (localStorage)

### Key: `financeflow_profile`
```json
{
  "salary": 50000,
  "budgets": {
    "Food": 10000,
    "Transport": 5000,
    "Entertainment": 8000,
    "Health": 3000,
    "Shopping": 5000,
    "Bills": 7000,
    "Savings": 5000,
    "Other": 2000
  }
}
```

### Key: `financeflow_expenses`
```json
[
  {
    "id": "uuid-string",
    "category": "Food",
    "amount": 450,
    "date": "2025-02-14",
    "note": "Lunch with friends"
  }
]
```

---

## 🚫 Out of Scope (for now)
- No user login or authentication
- No backend or database
- No multi-user support
- No recurring expenses automation
- No bank integration
- No dark mode (can be added later)

---

## ✅ Definition of Done
The app is considered complete when:
- All 6 pages are built and navigable
- Add/delete expenses works and persists on refresh
- Dashboard progress bars update in real time
- Both charts render correctly on Analytics page
- Health score calculates correctly
- App is deployed on Vercel with a live link
