import { UserEdit } from './user.typings';

export function getUserTruthyTypes(user: UserEdit): UserEdit {
  Object.entries(user).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      user[key] = null;
    }
  });
  return user;
}
