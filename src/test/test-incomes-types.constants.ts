import { IncomeTypeEntity } from 'src/model/income/income-type.entity';
import { UserEntity } from 'src/model/user.entity';

export function getTestIncomeTypesData(
  user: UserEntity,
): Omit<IncomeTypeEntity, 'id'>[] {
  return [
    {
      name: 'Interest Income',
      user,
    },
    {
      name: 'Other Income',
      user,
    },
    {
      name: 'Investment Income',
      user,
    },
  ];
}
