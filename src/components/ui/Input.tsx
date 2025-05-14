import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, prefixIcon, suffixIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        )}
        <div className="relative rounded-md shadow-sm">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
              p-2
              ${prefixIcon ? 'pl-7' : ''}
              ${suffixIcon ? 'pr-12' : ''}
              ${error ? 'border-red-300' : 'border-gray-300'}
              ${className || ''}
            `}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {suffixIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';