export interface UserProfile {
   name: string; 
  salary: number;
  budgets: {
    [category: string]: number;
  };
}
