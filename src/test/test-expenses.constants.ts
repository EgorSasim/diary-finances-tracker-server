import { EXPENSE_DEFAULT_TYPE_NAMES } from 'src/controllers/expense-type/expense-type.constants';
import { ExpenseEntity } from 'src/model/expense/expense.entity';
import { UserEntity } from 'src/model/user.entity';

export function getTestExpensesData(
  user: UserEntity,
): Omit<ExpenseEntity, 'id'>[] {
  return [
    {
      amount: 273,
      comment: 'Expense Transaction 1',
      date: new Date('2024-04-20'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 121,
      comment: 'Expense Transaction 2',
      date: new Date('2024-04-06'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 228,
      comment: 'Expense Transaction 3',
      date: new Date('2024-04-29'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 264,
      comment: 'Expense Transaction 4',
      date: new Date('2024-04-11'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 189,
      comment: 'Expense Transaction 5',
      date: new Date('2024-04-23'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 13,
      comment: 'Expense Transaction 6',
      date: new Date('2024-04-08'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 256,
      comment: 'Expense Transaction 7',
      date: new Date('2024-04-19'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 587,
      comment: 'Expense Transaction 8',
      date: new Date('2024-04-04'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 321,
      comment: 'Expense Transaction 9',
      date: new Date('2024-04-14'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 654,
      comment: 'Expense Transaction 10',
      date: new Date('2024-04-25'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 234,
      comment: 'Expense Transaction 11',
      date: new Date('2024-04-17'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 123,
      comment: 'Expense Transaction 12',
      date: new Date('2024-04-28'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 345,
      comment: 'Expense Transaction 13',
      date: new Date('2024-04-03'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 265,
      comment: 'Expense Transaction 14',
      date: new Date('2024-04-10'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 523,
      comment: 'Expense Transaction 15',
      date: new Date('2024-02-22'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 376,
      comment: 'Expense Transaction 16',
      date: new Date('2024-03-09'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 273.231,
      comment: 'Expense Transaction 1',
      date: new Date('2024-04-20'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 321,
      comment: 'Expense Transaction 2',
      date: new Date('2024-04-06'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 298,
      comment: 'Expense Transaction 3',
      date: new Date('2024-04-29'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 564,
      comment: 'Expense Transaction 4',
      date: new Date('2024-04-11'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 589,
      comment: 'Expense Transaction 5',
      date: new Date('2024-04-23'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 123,
      comment: 'Expense Transaction 6',
      date: new Date('2024-04-08'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 456,
      comment: 'Expense Transaction 7',
      date: new Date('2024-04-19'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 987,
      comment: 'Expense Transaction 8',
      date: new Date('2024-04-04'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 321,
      comment: 'Expense Transaction 9',
      date: new Date('2024-04-14'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 654,
      comment: 'Expense Transaction 10',
      date: new Date('2024-04-25'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 234,
      comment: 'Expense Transaction 11',
      date: new Date('2024-04-17'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 123,
      comment: 'Expense Transaction 12',
      date: new Date('2024-04-28'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 345,
      comment: 'Expense Transaction 13',
      date: new Date('2024-04-03'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 765,
      comment: 'Expense Transaction 14',
      date: new Date('2024-04-10'),
      type: getRandExpenseType(),
      user,
    },
    {
      amount: 123,
      comment: 'Expense Transaction 15',
      date: new Date('2024-04-22'),
      type: getRandExpenseType(),
      user,
    },
  ];
}

function getRandExpenseType(): string {
  return EXPENSE_DEFAULT_TYPE_NAMES[
    Math.floor(Math.random() * EXPENSE_DEFAULT_TYPE_NAMES.length)
  ];
}
