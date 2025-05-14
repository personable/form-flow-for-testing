import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';

export const LineItemsSection: React.FC = () => {
  const { proposalData, addLineItem, removeLineItem } = useProposal();
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  
  const handleAddItem = () => {
    if (newItemDesc.trim() && newItemAmount.trim()) {
      addLineItem({
        description: newItemDesc,
        amount: parseFloat(newItemAmount),
      });
      setNewItemDesc('');
      setNewItemAmount('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newItemDesc.trim() && newItemAmount.trim()) {
      e.preventDefault();
      handleAddItem();
    }
  };

  const total = proposalData.lineItems.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Cost Breakdown</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Add items to break down the project costs
        </p>
      </div>
      
      <div className="p-4">
        {proposalData.lineItems.length > 0 && (
          <div className="mb-6 divide-y divide-gray-100">
            {proposalData.lineItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 group">
                <p className="text-gray-700">{item.description}</p>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">${item.amount.toFixed(2)}</span>
                  <button
                    onClick={() => removeLineItem(item.id)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 mb-4">
          <Input
            placeholder="Description"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-50 focus:bg-white transition-colors duration-200"
          />
          <Input
            placeholder="Amount"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            type="number"
            min="0"
            step="0.01"
            prefix={<DollarSign size={16} className="text-gray-500" />}
            className="w-32 bg-gray-50 focus:bg-white transition-colors duration-200"
          />
        </div>
        
        <Button
          onClick={handleAddItem}
          variant="outline"
          fullWidth
          className="mb-6"
        >
          <Plus size={16} className="mr-2" />
          <span>Add Item</span>
        </Button>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total</span>
            <span className="text-xl font-semibold text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};