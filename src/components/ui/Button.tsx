'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-lg hover:bg-primary-700 transition-all',
  secondary: 'bg-secondary text-white hover:opacity-90 transition-all',
  outline:
    'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all',
  ghost: 'text-foreground hover:bg-black/5 transition-colors',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl font-bold',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: keyof typeof sizeStyles;
  asChild?: false;
}

export interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'size'> {
  variant?: ButtonVariant;
  size?: keyof typeof sizeStyles;
  asChild: true;
  href: string;
}

type ButtonBaseProps = (ButtonProps | ButtonLinkProps) & { children: React.ReactNode };

export function Button(props: ButtonBaseProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    asChild,
    children,
    ...rest
  } = props;
  const href = 'href' in props ? props.href : undefined;
  const base = 'inline-flex items-center justify-center font-medium';
  const combined = cn(base, variantStyles[variant], sizeStyles[size], className);

  if (asChild && href) {
    return (
      <Link href={href} className={combined} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={combined} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
