import React, { createContext, useContext, useState } from 'react';

export type LineItem = {
  id: string;
  description: string;
  amount: number;
};

export type CustomerAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type CustomerContact = {
  name: string;
  phone: string;
  email: string;
};

export type ProposalData = {
  proposalNumber: string;
  customerAddress: CustomerAddress;
  customerContact: CustomerContact;
  scopeOfWork: string;
  scopeImages: string[];
  lineItems: LineItem[];
  timeframe: string;
  timeframeImages: string[];
  total: number;
  downPayment: {
    percentage: number;
    amount: number;
  };
  termsAndConditions: string;
};

type ProposalContextType = {
  proposalData: ProposalData;
  updateProposalData: (data: Partial<ProposalData>) => void;
  addLineItem: (item: Omit<LineItem, 'id'>) => void;
  updateLineItem: (id: string, item: Partial<Omit<LineItem, 'id'>>) => void;
  removeLineItem: (id: string) => void;
  calculateTotal: () => number;
  calculateDownPayment: () => number;
};

const defaultProposalData: ProposalData = {
  proposalNumber: '#123',
  customerAddress: {
    street: '12 Main St.',
    city: 'Portland',
    state: 'ME',
    zip: '04103',
  },
  customerContact: {
    name: 'Jane Stevens',
    phone: '(555) 555-5555',
    email: 'j-stevens1986@hotmail.com',
  },
  scopeOfWork: '',
  scopeImages: [],
  lineItems: [],
  timeframe: '',
  timeframeImages: [],
  total: 0,
  downPayment: {
    percentage: 0,
    amount: 0,
  },
  termsAndConditions:
    'All work will be performed in a professional and timely manner in accordance with local building codes and industry standards. This estimate is valid for 30 days.',
};

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [proposalData, setProposalData] = useState<ProposalData>(defaultProposalData);

  const updateProposalData = (data: Partial<ProposalData>) => {
    setProposalData((prevData) => ({ ...prevData, ...data }));
  };

  const addLineItem = (item: Omit<LineItem, 'id'>) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    setProposalData((prevData) => ({
      ...prevData,
      lineItems: [...prevData.lineItems, newItem],
    }));
  };

  const updateLineItem = (id: string, item: Partial<Omit<LineItem, 'id'>>) => {
    setProposalData((prevData) => ({
      ...prevData,
      lineItems: prevData.lineItems.map((lineItem) =>
        lineItem.id === id ? { ...lineItem, ...item } : lineItem
      ),
    }));
  };

  const removeLineItem = (id: string) => {
    setProposalData((prevData) => ({
      ...prevData,
      lineItems: prevData.lineItems.filter((item) => item.id !== id),
    }));
  };

  const calculateTotal = () => {
    const total = proposalData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    return total;
  };

  const calculateDownPayment = () => {
    const total = calculateTotal();
    const amount = (total * proposalData.downPayment.percentage) / 100;
    return amount;
  };

  return (
    <ProposalContext.Provider
      value={{
        proposalData,
        updateProposalData,
        addLineItem,
        updateLineItem,
        removeLineItem,
        calculateTotal,
        calculateDownPayment,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = (): ProposalContextType => {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
};