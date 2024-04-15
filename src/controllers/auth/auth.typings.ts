export interface SignIn {
  login: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
  login: string;
}

export interface AccessToken {
  accessToken: string;
}
