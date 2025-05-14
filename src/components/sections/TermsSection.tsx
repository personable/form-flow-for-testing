import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { TextArea } from '../ui/TextArea';
import { MapPin } from 'lucide-react';

export const TermsSection: React.FC = () => {
  const { proposalData, updateProposalData } = useProposal();
  
  const handleTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProposalData({ termsAndConditions: e.target.value });
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Terms & Conditions</h2>
      
      <div className="flex items-center mb-3 text-sm text-blue-500">
        <MapPin size={14} className="mr-1" />
        <span>Found in Payment Settings</span>
      </div>
      
      <TextArea
        value={proposalData.termsAndConditions}
        onChange={handleTermsChange}
        rows={4}
      />
    </div>
  );
};