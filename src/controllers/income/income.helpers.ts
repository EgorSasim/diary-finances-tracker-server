import { IncomeSearchParams } from './income.typings';

export function getIncomeSearchParamsTruthyTypes(
  income: IncomeSearchParams,
): IncomeSearchParams {
  return { ...income, date: income.date ? new Date(income.date) : null };
}
