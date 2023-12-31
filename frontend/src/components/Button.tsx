import {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({children, ...rest}: ButtonProps) {
  return (
    <button
      {...rest}
    >
      {children}
    </button>
  );
}