import type { MarkdownData } from '@/i18n';

// Types
import type { IUser } from '@/types';

export interface LoginResponse {
  jwt: string;
  user: IUser;
}

export interface LoginContent extends MarkdownData {
  title: string;
  fields: {
    identifier: {
      placeholder: string;
      ariaLabel: string;
    };
    password: {
      placeholder: string;
      ariaLabel: string;
    };
  };
  actions: {
    submit: {
      label: string;
      loadingLabel: string;
    };
    forgotPassword: {
      label: string;
    };
  };
  errors: {
    required: string;
    invalidEmail: string;
    invalidCredentials: string;
    something: string;
  };
  signup: {
    title: string;
    description: string;
  };
}
