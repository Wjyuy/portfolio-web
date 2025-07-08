'use client';

import { X } from 'lucide-react';
import { useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: { url: string; caption: string }[];
  initialIndex: number;
}

const VideoModal = ({ isOpen, onClose, videos, initialIndex }: VideoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1));
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0));
      }
    },
    [onClose, videos.length]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="relative w-full max-w-4xl max-h-full bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black bg-opacity-50"
          aria-label="Close video modal"
        >
          <X size={24} />
        </button>

        <div className="relative flex-grow flex items-center justify-center p-4">
          <video
            src={currentVideo.url}
            controls
            autoPlay
            loop
            className="max-w-full max-h-[80vh] object-contain rounded-md"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {currentVideo.caption && (
          <div className="p-4 text-center text-white bg-gray-800 bg-opacity-75 rounded-b-lg">
            {currentVideo.caption}
          </div>
        )}

        {videos.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
              aria-label="Previous video"
            >
              &#10094;
            </button>
            <button
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
              aria-label="Next video"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;