import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProposalProvider } from './src/context/ProposalContext';
import { ProposalForm } from './src/components/ProposalForm';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProposalProvider>
        <ProposalForm />
      </ProposalProvider>
    </SafeAreaProvider>
  );
}