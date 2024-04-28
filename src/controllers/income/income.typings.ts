export interface Income {
  id: number;
  amount: number;
  type: string;
  date: Date;
  comment: string;
}

export interface IncomeSearchParams {
  amount?: number;
  type?: string;
  date?: Date;
}
