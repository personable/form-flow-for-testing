import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Card } from '../ui/Card';
import { MapPin } from 'lucide-react';

export const CustomerAddressSection: React.FC = () => {
  const { proposalData } = useProposal();
  const { street, city, state, zip } = proposalData.customerAddress;
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Customer Address</h2>
      <Card>
        <p className="text-gray-800">{street}</p>
        <p className="text-gray-800">{city}, {state} {zip}</p>
        <div className="flex items-center mt-2 text-sm text-blue-500">
          <MapPin size={14} className="mr-1" />
          <span>Found in Project Location</span>
        </div>
      </Card>
    </div>
  );
};