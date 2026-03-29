export interface UserProfile {
  salary: number;
  budgets: {
    [category: string]: number;
  };
}
