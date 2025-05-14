import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { TextArea } from '../ui/TextArea';
import { VoiceInput } from '../ui/VoiceInput';
import { ImageUpload } from '../ui/ImageUpload';
import { ImageModal } from '../ui/ImageModal';

export const TimeframeSection: React.FC = () => {
  const { proposalData, updateProposalData } = useProposal();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProposalData({ timeframe: e.target.value });
  };
  
  const handleVoiceInput = (text: string) => {
    updateProposalData({
      timeframe: proposalData.timeframe
        ? `${proposalData.timeframe} ${text}`
        : text,
    });
  };
  
  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    updateProposalData({
      timeframeImages: [...proposalData.timeframeImages, imageUrl],
    });
  };
  
  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Timeframe</h2>
          <VoiceInput 
            onVoiceInput={handleVoiceInput}
            isListening={isRecording}
            onListeningChange={setIsRecording}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {isRecording 
            ? "Speaking... Click the microphone again to stop."
            : "Describe how long this job will take. Click the microphone to start recording."}
        </p>
      </div>
      
      <div className="p-4">
        <TextArea
          value={proposalData.timeframe}
          onChange={handleTextChange}
          placeholder="Enter project timeframe..."
          rows={4}
          className="mb-4 bg-gray-50 focus:bg-white transition-colors duration-200"
        />
        
        <div className="flex items-center gap-3">
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {proposalData.timeframeImages.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {proposalData.timeframeImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="relative w-12 h-12 rounded-lg overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={`Timeframe image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
                </button>
              ))}
            </div>
          )}
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