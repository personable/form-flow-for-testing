import React from 'react';
import { ProposalForm } from './components/ProposalForm';
import { ProposalProvider } from './context/ProposalContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProposalProvider>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <ProposalForm />
        </div>
      </ProposalProvider>
    </div>
  );
}

export default App;