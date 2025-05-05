import React, { forwardRef, useState, type FocusEvent } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type InputProps = JSX.IntrinsicElements['input'] & {
  label: string;
  error?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  type?: React.HTMLInputTypeAttribute;
  inputClassName?: string;
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const Input: React.FC<InputProps> = forwardRef(
  (
    {
      className,
      label,
      error,
      startIcon,
      endIcon,
      type = 'text',
      disabled,
      inputClassName,
      onFocus,
      onBlur,
      containerRef,
      ...otherProps
    }: InputProps,
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocus(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      onBlur && onBlur(e);
    };

    return (
      <label className={twMerge(clsx('block', className))}>
        <span
          className={twMerge(
            clsx('test-label inline-block text-gray-500', {
              'text-error-light': error,
            }),
          )}
        >
          {label}
        </span>
        <div
          ref={containerRef}
          className={twMerge(
            clsx(
              'group mt-1 flex items-center rounded-md border border-gray-300 p-2 shadow-sm',
              {
                'border-transparent ring-2 ring-primary-main': isFocus,
                'border-error-light': error,
                'border-transparent ring-2 ring-error-light': error && isFocus,
                'border-transparent bg-zinc-200 ring-0': disabled,
              },
            ),
          )}
        >
          {startIcon !== undefined && <span className="mr-1">{startIcon}</span>}
          <input
            {...otherProps}
            type={type}
            disabled={disabled}
            ref={ref}
            className={twMerge(
              clsx(
                'flex-1 focus:outline-none',
                {
                  'bg-inherit': disabled,
                },
                inputClassName,
              ),
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {endIcon !== undefined && (
            <span
              className={twMerge(
                clsx('ml-1 text-gray-500', {
                  'text-gray-400': disabled,
                }),
              )}
            >
              {endIcon}
            </span>
          )}
        </div>
        {error && <span className="text-error-light">{error}</span>}
      </label>
    );
  },
);

export default Input;
