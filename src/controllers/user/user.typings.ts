export interface User {
  id: number;
  login: string;
  email: string;
  password: string;
}

export interface UserEdit {
  email: string;
  newPassword: string;
  oldPassword: string;
}
