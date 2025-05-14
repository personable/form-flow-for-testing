import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Card } from '../ui/Card';
import { MapPin, Pencil } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const CustomerInfoSection: React.FC = () => {
  const { proposalData, updateProposalData } = useProposal();
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [addressData, setAddressData] = useState(proposalData.customerAddress);
  const [contactData, setContactData] = useState(proposalData.customerContact);

  const handleSaveAddress = () => {
    updateProposalData({ customerAddress: addressData });
    setEditingAddress(false);
  };

  const handleSaveContact = () => {
    updateProposalData({ customerContact: contactData });
    setEditingContact(false);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Customer Information</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Address</h3>
            <button
              onClick={() => setEditingAddress(!editingAddress)}
              className="text-blue-500 hover:text-blue-700 p-1"
            >
              <Pencil size={16} />
            </button>
          </div>
          
          <Card>
            {editingAddress ? (
              <div className="space-y-3">
                <Input
                  label="Street"
                  value={addressData.street}
                  onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                />
                <Input
                  label="City"
                  value={addressData.city}
                  onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="State"
                    value={addressData.state}
                    onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                  />
                  <Input
                    label="ZIP"
                    value={addressData.zip}
                    onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}
                  />
                </div>
                <Button onClick={handleSaveAddress} fullWidth>Save Address</Button>
              </div>
            ) : (
              <>
                <p className="text-gray-800">{proposalData.customerAddress.street}</p>
                <p className="text-gray-800">
                  {proposalData.customerAddress.city}, {proposalData.customerAddress.state} {proposalData.customerAddress.zip}
                </p>
                <div className="flex items-center mt-2 text-sm text-blue-500">
                  <MapPin size={14} className="mr-1" />
                  <span>Found in Project Location</span>
                </div>
              </>
            )}
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Contact</h3>
            <button
              onClick={() => setEditingContact(!editingContact)}
              className="text-blue-500 hover:text-blue-700 p-1"
            >
              <Pencil size={16} />
            </button>
          </div>
          
          <Card>
            {editingContact ? (
              <div className="space-y-3">
                <Input
                  label="Name"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                />
                <Input
                  label="Phone"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
                <Button onClick={handleSaveContact} fullWidth>Save Contact</Button>
              </div>
            ) : (
              <>
                <p className="text-gray-800 font-medium">{proposalData.customerContact.name}</p>
                <p className="text-gray-800">{proposalData.customerContact.phone}</p>
                <p className="text-gray-800">{proposalData.customerContact.email}</p>
                <div className="flex items-center mt-2 text-sm text-blue-500">
                  <MapPin size={14} className="mr-1" />
                  <span>Found in Project Contact</span>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};