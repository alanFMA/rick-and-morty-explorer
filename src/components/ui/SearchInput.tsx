import type { InputHTMLAttributes, JSX } from 'react';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function SearchInput({
  label,
  id,
  className = '',
  ...props
}: SearchInputProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        className={`rounded-full border border-white/10 bg-background-secondary/60 px-4 py-2 text-foreground placeholder:text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-green ${className}`}
        {...props}
      />
    </div>
  );
}
