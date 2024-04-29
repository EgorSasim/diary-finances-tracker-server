export interface Expense {
  id: number;
  amount: number;
  type: string;
  date: Date;
  comment: string;
}

export interface ExpenseSearchParams {
  amount?: number;
  type?: string;
  date?: Date;
}
