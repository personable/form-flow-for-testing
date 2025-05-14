import React from 'react';
import { ProposalForm } from './components/ProposalForm';
import { ProposalProvider } from './context/ProposalContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProposalProvider>
        <div className="mx-auto lg overflow-hidden" style={{maxWidth: 600}}>
          <ProposalForm />
        </div>
      </ProposalProvider>
    </div>
  );
}

export default App;