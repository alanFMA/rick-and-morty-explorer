import type { ButtonHTMLAttributes, JSX } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-portal-green text-background hover:bg-portal-green/90',
  secondary:
    'border border-white/20 bg-transparent text-foreground hover:border-portal-green hover:text-portal-green',
};

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-green disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
