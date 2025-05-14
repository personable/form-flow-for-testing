import React, { useState } from 'react';
import { Camera, Image } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload?: (file: File) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, disabled = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onImageUpload) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        onImageUpload(files[0]);
        setIsUploading(false);
        // Reset the input to allow uploading the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);
    }
  };
  
  return (
    <div className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        disabled={disabled || isUploading}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isUploading}
        className={`
          p-2 rounded-md text-gray-800 hover:bg-gray-100
          transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500
          text-xs flex items-center gap-2 text-gray-700
        `}
      >
        {isUploading ? (
          <div className="animate-pulse">
            <Image size={20} />
          </div>
        ) : (
          <Camera size={20} />
        )}
        Add Photos
      </button>
    </div>
  );
};