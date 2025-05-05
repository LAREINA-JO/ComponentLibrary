import React, { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Loading from '../Loading';

type TextProps = {
  text: string;
};

type ChildrenProps = {
  children: ReactNode;
};

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'children'> &
  (TextProps | ChildrenProps) & {
    isLoading?: boolean;
  };

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  isLoading,
  ...restProps
}: ButtonProps) => {
  let childContent: string | React.ReactNode;
  let otherProps;
  if ('children' in restProps) {
    const { children, ...props } = restProps;
    childContent = children;
    otherProps = props;
  }

  if ('text' in restProps) {
    const { text, ...props } = restProps;
    childContent = text;
    otherProps = props;
  }

  const isDisabled = disabled || isLoading;

  return (
    <button
      {...otherProps}
      disabled={isDisabled}
      className={twMerge(
        clsx(
          'rounded-md bg-primary-main px-4 py-2 text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark active:translate-y-0.5 active:bg-primary-main',
          {
            'bg-primary-light': isDisabled,
            'hover:bg-primary-light': isDisabled,
            'hover:translate-y-0': isDisabled,
            'active:bg-primary-light': isDisabled,
            'active:translate-y-0': isDisabled,
          },
          className,
        ),
      )}
    >
      {childContent}
      {isLoading && <Loading className="ml-3 text-inherit" />}
    </button>
  );
};

export default Button;
