export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string; // format: 'YYYY-MM-DD'
  note: string;
}
