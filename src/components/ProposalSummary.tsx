import React from 'react';
import { useProposal } from '../context/ProposalContext';
import { Card } from './ui/Card';

export const ProposalSummary: React.FC = () => {
  const { proposalData } = useProposal();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Proposal Summary</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
          <Card>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Address:</span> {proposalData.customerAddress.street},
                {proposalData.customerAddress.city}, {proposalData.customerAddress.state} {proposalData.customerAddress.zip}
              </p>
              <p>
                <span className="font-medium">Contact:</span> {proposalData.customerContact.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {proposalData.customerContact.phone}
              </p>
              <p>
                <span className="font-medium">Email:</span> {proposalData.customerContact.email}
              </p>
            </div>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">Scope of Work</h2>
          <Card>
            <p className="whitespace-pre-wrap">{proposalData.scopeOfWork}</p>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">Line Items</h2>
          <Card>
            <div className="space-y-2">
              {proposalData.lineItems.map((item, index) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.description}</span>
                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${proposalData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">Payment Terms</h2>
          <Card>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Down Payment:</span> ${proposalData.downPayment.amount.toFixed(2)}
                ({proposalData.downPayment.percentage}%)
              </p>
              <p>
                <span className="font-medium">Timeframe:</span> {proposalData.timeframe}
              </p>
            </div>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">Terms & Conditions</h2>
          <Card>
            <p className="whitespace-pre-wrap">{proposalData.termsAndConditions}</p>
          </Card>
        </section>
      </div>
    </div>
  );
};