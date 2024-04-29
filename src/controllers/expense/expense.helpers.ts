import { ExpenseSearchParams } from './expense.typings';

export function getExpenseSearchParamsTruthyTypes(
  expense: ExpenseSearchParams,
): ExpenseSearchParams {
  return { ...expense, date: expense.date ? new Date(expense.date) : null };
}
