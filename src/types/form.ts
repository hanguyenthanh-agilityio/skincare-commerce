export interface IUser {
  id: number;
  documentId: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  rememberMe: boolean;
  username: string;
}

export type TSignInFormData = {
  identifier: string;
  password: string;
};
