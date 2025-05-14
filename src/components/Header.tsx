import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack }) => {
  return (
    <div className="pt-4 relative">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-500" />
        </button>
      )}
      <div className="text-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm font-medium text-gray-700">{subtitle}</p>
      </div>
    </div>
  );
};