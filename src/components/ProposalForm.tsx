import React, { useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import { Header } from './Header';
import { CustomerInfoSection } from './sections/CustomerInfoSection';
import { ScopeOfWorkSection } from './sections/ScopeOfWorkSection';
import { LineItemsSection } from './sections/LineItemsSection';
import { TimeframeSection } from './sections/TimeframeSection';
import { DownPaymentSection } from './sections/DownPaymentSection';
import { TermsSection } from './sections/TermsSection';
import { ProposalPreview } from './ProposalPreview';
import { Button } from './ui/Button';

const sections = [
  { id: 'customerInfo', component: CustomerInfoSection, title: 'Customer Information' },
  { id: 'scope', component: ScopeOfWorkSection, title: 'Scope of Work' },
  { id: 'timeframe', component: TimeframeSection, title: 'Timeframe' },
  { id: 'lineItems', component: LineItemsSection, title: 'Cost Breakdown' },
  { id: 'downPayment', component: DownPaymentSection, title: 'Down Payment' },
  { id: 'terms', component: TermsSection, title: 'Terms & Conditions' },
];

export const ProposalForm: React.FC = () => {
  const { proposalData } = useProposal();
  const [showPreview, setShowPreview] = useState(false);

  if (showPreview) {
    return <ProposalPreview onBack={() => setShowPreview(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title={proposalData.customerAddress.street}
        subtitle={`Proposal ${proposalData.proposalNumber}`}
      />
      
      <div className="flex-1 overflow-auto">
        {sections.map((Section) => (
          <div key={Section.id} className="">
            <Section.component />
          </div>
        ))}
      </div>

      <div className="pb-8">
        <Button
          onClick={() => setShowPreview(true)}
          title="Create Proposal"
          fullWidth
        />
      </div>
    </div>
  );
};