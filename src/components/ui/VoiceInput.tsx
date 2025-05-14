import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  onVoiceInput?: (text: string) => void;
  disabled?: boolean;
  isListening?: boolean;
  onListeningChange?: (isListening: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onVoiceInput,
  disabled = false,
  isListening = false,
  onListeningChange
}) => {
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  const errorTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const setTemporaryError = (message: string, duration = 3000) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    setError(message);
    errorTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        setError(null);
      }
    }, duration);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      onListeningChange?.(false);
    }
  };

  const startListening = () => {
    try {
      setError(null);

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech recognition not supported in this browser');
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        if (isMountedRef.current) {
          onListeningChange?.(true);
          setError(null);
        }
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (onVoiceInput) {
          if (finalTranscript.trim()) {
            onVoiceInput(finalTranscript.trim());
          } else if (interimTranscript.trim()) {
            onVoiceInput(interimTranscript.trim());
          }
        }
      };

      recognition.onerror = (event: any) => {
        if (!isMountedRef.current) return;
        
        console.error('Speech recognition error:', event.error);
        
        switch (event.error) {
          case 'no-speech':
            setTemporaryError('No speech detected. Please try speaking again.');
            break;
          case 'not-allowed':
            setError('Microphone access denied. Please enable microphone permissions.');
            break;
          case 'network':
            setTemporaryError('Network error. Please check your connection.');
            break;
          default:
            setTemporaryError('Speech recognition error. Please try again.');
        }

        onListeningChange?.(false);
      };

      recognition.onend = () => {
        if (!isMountedRef.current) return;
        
        if (isListening) {
          try {
            recognition.start();
          } catch (err) {
            console.error('Failed to restart recognition:', err);
            onListeningChange?.(false);
          }
        } else {
          onListeningChange?.(false);
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Speech recognition failed');
        onListeningChange?.(false);
      }
    }
  };

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          p-2 rounded-full transition-all duration-200
          ${isListening ? 'bg-red-700 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title={isListening ? 'Stop recording' : 'Start voice input'}
      >
        {isListening ? (
          <MicOff size={20} />
        ) : (
          <Mic size={20} />
        )}
      </button>
      
      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 text-red-600 text-sm p-2 rounded-md whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
};