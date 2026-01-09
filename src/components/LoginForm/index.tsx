import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

// Types
import type { Locale, LoginContent, TSignInFormData } from '@/types';

import { loadContent } from '@/i18n';

// Components
import { Button, Input } from '@/ui';
import { LinkWrapper, TypographyWrapper } from '@/components';
import { Spinner } from '@/ui';

interface LoginProps {
  locale: Locale;
}

const LoginForm = ({ locale }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignInFormData>({
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (data: TSignInFormData) => {
    try {
      setIsLoading(true);

      // TODO: call API sign in
      console.log('data', data);

      // success flow here
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setApiError(errors.invalidCredentials);
    }
  });

  const { title, fields, actions, signup, errors } = loadContent<LoginContent>('login', locale);

  return (
    <div className="w-full">
      <TypographyWrapper level="p" title={title} className="text-2xl mb-7 font-medium" />

      {/* Form */}
      <form className="mb-10" onSubmit={onSubmit}>
        <div className="space-y-10 mb-5">
          <Controller
            control={control}
            name="identifier"
            rules={{
              required: errors.required,
              pattern: {
                value: /^\S+@\S+$/i,
                message: errors.invalidEmail,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                aria-label={fields.identifier.ariaLabel}
                placeholder={fields.identifier.placeholder}
                type="email"
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                className="md:text-xl! md:placeholder:text-lg border-0 border-b rounded-none focus-visible:ring-0"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: errors.required }}
            render={({ field, fieldState: { error } }) => (
              <Input
                aria-label={fields.password.ariaLabel}
                placeholder={fields.password.placeholder}
                type="password"
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                className="md:text-xl! md:placeholder:text-lg border-0 border-b rounded-none focus-visible:ring-0"
                {...field}
              />
            )}
          />
        </div>

        {/* Forgot password */}
        <LinkWrapper
          href="#"
          aria-disabled
          className="block text-right! text-destructive-foreground text-sm leading-4 mb-7"
        >
          {actions.forgotPassword.label}
        </LinkWrapper>

        {/* Login button */}
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 mb-7">
          {isLoading ? (
            <div className="flex justify-center items-center gap-3">
              <Spinner />
              <TypographyWrapper level="span" title={actions.submit.loadingLabel} />
            </div>
          ) : (
            <TypographyWrapper level="span" title={actions.submit.label} />
          )}
        </Button>

        {apiError && (
          <TypographyWrapper
            level="span"
            title={apiError}
            className="text-sm text-red-400 font-medium"
          />
        )}
      </form>

      {/* Divider */}
      <div className="flex flex-col gap-5">
        <TypographyWrapper level="span" title={signup.title} className="text-xl font-medium" />

        <TypographyWrapper level="p" title={signup.description} className="text-sm" />
      </div>
    </div>
  );
};

export default LoginForm;
