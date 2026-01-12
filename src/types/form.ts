export interface IUser {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  rememberMe: boolean;
  username: string;
}

export type TSignInFormData = Pick<IUser, 'password'> & {
  identifier: string;
};
