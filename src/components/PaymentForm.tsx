import React, { useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
  onBack: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onBack }) => {
  const { proposalData } = useProposal();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would typically make an API call to your payment processor
    console.log('Processing payment:', {
      amount: proposalData.downPayment.amount,
      cardNumber,
      expiry,
      cvc,
      name,
    });
    
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
      >
        ← Back to Proposal
      </button>

      <div className="max-w-md mx-auto">
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Down Payment</h2>
            <p className="text-gray-600 mt-1">
              Amount due: ${proposalData.downPayment.amount.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                prefixIcon={<CreditCard className="text-gray-400" size={20} />}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                placeholder="MM/YY"
                prefixIcon={<Calendar className="text-gray-400" size={20} />}
                required
              />
              <Input
                label="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                maxLength={4}
                placeholder="123"
                prefixIcon={<Lock className="text-gray-400" size={20} />}
                required
              />
            </div>

            <div>
              <Input
                label="Name on Card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>

            <Button
              onClick={() => {}}
              title={processing ? 'Processing...' : `Pay $${proposalData.downPayment.amount.toFixed(2)}`}
              fullWidth
              className={processing ? 'opacity-75 cursor-not-allowed' : ''}
            />
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <Lock className="inline-block mr-1" size={14} />
            Your payment information is secure and encrypted
          </div>
        </Card>
      </div>
    </div>
  );
};