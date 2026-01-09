import * as React from 'react';
import { cn } from '@/lib';
import { TypographyWrapper } from '@/components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
}

const Input = ({ label, helpText, errorMessage, isInvalid, className, type, ...props }: InputProps) => {
  const hasError = isInvalid || !!errorMessage;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium">
          {label}
        </label>
      )}
      
      {helpText  && (
        <TypographyWrapper level="span" title={helpText} className="text-xs text-destructive-foreground" />
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          hasError ? "text-red-400 border-b border-red-400" : "",
          className,
        )}
        {...props}
      />

      {errorMessage && (
        <TypographyWrapper level="span" title={errorMessage} className="text-xs text-red-400" />
      )}

    </div>
  );
};

export { Input };
