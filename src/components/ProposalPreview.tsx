import React, { useState, useEffect } from 'react';
import { useProposal } from '../context/ProposalContext';
import { Header } from './Header';
import { PaymentForm } from './PaymentForm';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Input } from './ui/Input';
import { DollarSign, Plus } from 'lucide-react';
import { ImageModal } from './ui/ImageModal';

interface ProposalPreviewProps {
  onBack: () => void;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ onBack }) => {
  const { proposalData, updateProposalData, addLineItem } = useProposal();
  const [showPayment, setShowPayment] = useState(false);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const date = new Date().toLocaleDateString();

  const scopeEditor = useEditor({
    extensions: [StarterKit],
    content: proposalData.scopeOfWork,
    editable: true,
  });

  const timeframeEditor = useEditor({
    extensions: [StarterKit],
    content: proposalData.timeframe,
    editable: true,
  });

  const termsEditor = useEditor({
    extensions: [StarterKit],
    content: proposalData.termsAndConditions,
    editable: true,
  });

  const handleAmountChange = (id: string, newAmount: string) => {
    const amount = parseFloat(newAmount) || 0;
    const updatedLineItems = proposalData.lineItems.map(item => 
      item.id === id ? { ...item, amount } : item
    );
    updateProposalData({ lineItems: updatedLineItems });
  };

  const handleAddItem = () => {
    if (newItemDesc.trim() && newItemAmount.trim()) {
      addLineItem({
        description: newItemDesc.trim(),
        amount: parseFloat(newItemAmount) || 0,
      });
      setNewItemDesc('');
      setNewItemAmount('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newItemDesc.trim() && newItemAmount.trim()) {
      e.preventDefault();
      handleAddItem();
    }
  };

  const total = proposalData.lineItems.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    const depositAmount = (total * proposalData.downPayment.percentage) / 100;
    updateProposalData({
      downPayment: {
        ...proposalData.downPayment,
        amount: depositAmount,
      },
    });
  }, [total, proposalData.downPayment.percentage]);

  if (showPayment) {
    return <PaymentForm onBack={() => setShowPayment(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        title="Proposal Preview" 
        subtitle={`Generated on ${date}`}
        onBack={onBack}
      />
      
      <div className=" mx-auto p-8">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="p-8 space-y-12">
            {/* Header Section */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900">Project Proposal</h1>
              <p className="text-gray-600 mt-2">Proposal #{proposalData.proposalNumber}</p>
              <p className="text-gray-600">{date}</p>
            </div>

            {/* Project and Customer Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Project Location</h2>
                <div className="space-y-1">
                  <p className="text-gray-700 text-lg break-words">{proposalData.customerAddress.street}</p>
                  <p className="text-gray-700 text-lg">
                    {proposalData.customerAddress.city}, {proposalData.customerAddress.state} {proposalData.customerAddress.zip}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Information</h2>
                <div className="space-y-1">
                  <p className="text-gray-700 text-lg">{proposalData.customerContact.name}</p>
                  <p className="text-gray-700">{proposalData.customerContact.phone}</p>
                  <p className="text-gray-700 break-words">{proposalData.customerContact.email}</p>
                </div>
              </div>
            </div>

            {/* Scope of Work */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 pb-2 border-b">Scope of Work</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap break-words">{proposalData.scopeOfWork}</div>
              </div>
              {proposalData.scopeImages.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {proposalData.scopeImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <img 
                        src={image} 
                        alt={`Scope image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cost Breakdown */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 pb-2 border-b">Cost Breakdown</h2>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 text-gray-600">Description</th>
                      <th className="text-right py-3 text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {proposalData.lineItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-3 break-words">{item.description}</td>
                        <td className="py-3">
                          <Input
                            type="number"
                            value={item.amount}
                            onChange={(e) => handleAmountChange(item.id, e.target.value)}
                            prefixIcon={<DollarSign size={16} className="text-gray-500" />}
                            className="w-32 text-right ml-auto"
                          />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-3">
                        <Input
                          placeholder="New item description"
                          value={newItemDesc}
                          onChange={(e) => setNewItemDesc(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center justify-end space-x-2">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={newItemAmount}
                            onChange={(e) => setNewItemAmount(e.target.value)}
                            onKeyPress={handleKeyPress}
                            prefixIcon={<DollarSign size={16} className="text-gray-500" />}
                            className="w-32 text-right"
                          />
                          <button
                            onClick={handleAddItem}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-200"
                            title="Add item"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="font-semibold text-lg border-t-2 border-gray-200">
                      <td className="py-4">Total</td>
                      <td className="text-right py-4 text-blue-600">
                        ${total.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Project Timeline */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 pb-2 border-b">Project Timeline</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap break-words">{proposalData.timeframe}</div>
              </div>
              {proposalData.timeframeImages.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {proposalData.timeframeImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <img 
                        src={image} 
                        alt={`Timeline image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Terms */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Terms</h2>
              <p className="text-gray-700 text-lg">
                Down Payment: <span className="font-semibold text-blue-600">${proposalData.downPayment.amount.toFixed(2)}</span> ({proposalData.downPayment.percentage}%)
              </p>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 pb-2 border-b">Terms & Conditions</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap break-words">{proposalData.termsAndConditions}</div>
              </div>
            </div>

            {/* Accept Button */}
            <div className="pt-8 border-t">
              <div className="text-center">
                <button
                  className="bg-blue-600 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform duration-200"
                  onClick={() => setShowPayment(true)}
                >
                  Accept Proposal
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  By clicking "Accept Proposal", you agree to the terms and conditions outlined above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};