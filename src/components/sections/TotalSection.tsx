import React, { useEffect } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Input } from '../ui/Input';
import { DollarSign } from 'lucide-react';

export const TotalSection: React.FC = () => {
  const { proposalData, updateProposalData, calculateTotal } = useProposal();
  
  useEffect(() => {
    const calculatedTotal = calculateTotal();
    updateProposalData({ total: calculatedTotal });
  }, [proposalData.lineItems, calculateTotal, updateProposalData]);
  
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateProposalData({ total: value });
  };
  
  return (
    <div className="mb-6 border border-dashed border-gray-300 rounded-lg p-4">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-medium text-gray-700">Total</h2>
      </div>
      
      <Input
        type="number"
        min="0"
        step="0.01"
        value={proposalData.total || ''}
        onChange={handleTotalChange}
        prefix={<DollarSign size={18} className="text-gray-500" />}
        className="mt-2"
      />
    </div>
  );
};