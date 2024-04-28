export interface IncomeType {
  id: number;
  name: string;
}

export type IncomeTypeSearchParams = Pick<IncomeType, 'name'>;
