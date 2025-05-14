import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Card } from '../ui/Card';
import { MapPin } from 'lucide-react';

export const CustomerContactSection: React.FC = () => {
  const { proposalData } = useProposal();
  const { name, phone, email } = proposalData.customerContact;
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Customer Contact</h2>
      <Card>
        <p className="text-gray-800 font-medium">{name}</p>
        <p className="text-gray-800">{phone}</p>
        <p className="text-gray-800">{email}</p>
        <div className="flex items-center mt-2 text-sm text-blue-500">
          <MapPin size={14} className="mr-1" />
          <span>Found in Project Contact</span>
        </div>
      </Card>
    </div>
  );
};