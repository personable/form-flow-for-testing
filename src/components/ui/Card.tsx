import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-50 rounded-md p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};