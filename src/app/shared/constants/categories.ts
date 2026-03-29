export interface Category {
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { name: 'Food', icon: '🍔', color: 'orange' },
  { name: 'Transport', icon: '🚗', color: 'blue' },
  { name: 'Entertainment', icon: '🎬', color: 'purple' },
  { name: 'Health', icon: '💊', color: 'green' },
  { name: 'Shopping', icon: '🛍️', color: 'pink' },
  { name: 'Bills', icon: '💡', color: 'yellow' },
  { name: 'Savings', icon: '💰', color: 'teal' },
  { name: 'Other', icon: '📦', color: 'grey' },
];
