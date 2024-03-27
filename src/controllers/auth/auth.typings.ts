export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
  name: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
