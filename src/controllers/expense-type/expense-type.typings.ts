export interface ExpenseType {
  id: number;
  name: string;
}

export type ExpenseTypeSearchParams = Pick<ExpenseType, 'name'>;
