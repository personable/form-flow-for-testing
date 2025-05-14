import React, { useEffect } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Input } from '../ui/Input';
import { DollarSign } from 'lucide-react';

export const DownPaymentSection: React.FC = () => {
  const { proposalData, updateProposalData, calculateDownPayment } = useProposal();
  
  const handlePercentageChange = (value: number) => {
    const percentage = Math.min(100, Math.max(0, value));
    updateProposalData({
      downPayment: {
        ...proposalData.downPayment,
        percentage,
      },
    });
  };
  
  const handlePercentageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    handlePercentageChange(value);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    const percentage = proposalData.total > 0 ? (amount / proposalData.total) * 100 : 0;
    
    updateProposalData({
      downPayment: {
        percentage,
        amount,
      },
    });
  };
  
  useEffect(() => {
    const amount = calculateDownPayment();
    updateProposalData({
      downPayment: {
        ...proposalData.downPayment,
        amount,
      },
    });
  }, [proposalData.downPayment.percentage, proposalData.total]);
  
  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Payment</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 mr-4">
              Percentage
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              step="5"
              value={proposalData.downPayment.percentage}
              onChange={handlePercentageInput}
              className="w-24 bg-gray-50 text-right"
              suffixIcon="%"
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={proposalData.downPayment.percentage}
            onChange={(e) => handlePercentageChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={proposalData.downPayment.amount || ''}
            onChange={handleAmountChange}
            className="bg-gray-50"
            prefixIcon={<DollarSign size={18} className="text-gray-500 mr-4" />}
          />
        </div>
      </div>
    </div>
  );
};