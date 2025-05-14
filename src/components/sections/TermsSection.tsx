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
    <div className="p-4 mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Terms & Conditions</h2>
      <TextArea
        value={proposalData.termsAndConditions}
        onChange={handleTermsChange}
        rows={4}
      />
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <MapPin size={14} className="mr-1" />
        <span>Found in Payment Settings</span>
      </div>
    </div>
  );
};