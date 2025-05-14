import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react-native';
import { ProposalPreview } from './ProposalPreview';

interface DevicePreviewProps {
  onBack: () => void;
}

export const DevicePreview: React.FC<DevicePreviewProps> = ({ onBack }) => {
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const deviceStyles = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-[1280px]',
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedDevice('mobile')}
          className={`p-3 rounded-lg ${
            selectedDevice === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
          }`}
          title="Mobile view"
        >
          <Smartphone size={24} />
        </button>
        <button
          onClick={() => setSelectedDevice('tablet')}
          className={`p-3 rounded-lg ${
            selectedDevice === 'tablet' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
          }`}
          title="Tablet view"
        >
          <Tablet size={24} />
        </button>
        <button
          onClick={() => setSelectedDevice('desktop')}
          className={`p-3 rounded-lg ${
            selectedDevice === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
          }`}
          title="Desktop view"
        >
          <Monitor size={24} />
        </button>
      </div>

      <div className="flex justify-center">
        <div className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${deviceStyles[selectedDevice]}`}>
          <div className={`${selectedDevice === 'mobile' ? 'scale-[0.6]' : selectedDevice === 'tablet' ? 'scale-[0.8]' : 'scale-100'} origin-top`}>
            <ProposalPreview onBack={onBack} />
          </div>
        </div>
      </div>
    </div>
  );
};