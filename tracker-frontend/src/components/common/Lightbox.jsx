import React from 'react';

const Lightbox = ({ imageUrl, onClose, onNext, onPrev }) => {
  if (!imageUrl) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white/90 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={handleOverlayClick}
    >
      {/* Brutalist Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 bg-red-500 text-white p-4 neo-border-thick neo-shadow neo-transition z-[210] hover:bg-red-600"
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Container */}
      <div className="relative flex items-center justify-center w-full max-w-7xl h-full">
        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 flex justify-between px-4 md:px-0 z-[210] pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="pointer-events-auto bg-white text-black p-6 neo-border-thick neo-shadow neo-transition hover:bg-yellow-400"
            aria-label="Previous"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="4" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="pointer-events-auto bg-white text-black p-6 neo-border-thick neo-shadow neo-transition hover:bg-yellow-400"
            aria-label="Next"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="4" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Image Display */}
        <div className="bg-white neo-border-thick neo-shadow-lg p-2 md:p-4 max-h-[85vh] flex items-center justify-center overflow-hidden rotate-[-0.5deg]">
          <img 
            src={imageUrl} 
            alt="Enlarged screenshot" 
            className="max-w-full max-h-[80vh] object-contain block" 
          />
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
