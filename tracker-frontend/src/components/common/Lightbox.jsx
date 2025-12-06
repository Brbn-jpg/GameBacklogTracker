import React from 'react';

const Lightbox = ({ imageUrl, onClose, onNext, onPrev }) => {
  if (!imageUrl) return null;

  const handleOverlayClick = (e) => {
    // Close only if the overlay itself is clicked, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-md"
      onClick={handleOverlayClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-cyan-400 transition-colors"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Image and Navigation Container */}
      <div className="relative flex items-center justify-center w-full max-w-6xl">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute -left-16 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Previous"
        >
          &#10094;
        </button>

        {/* Image */}
        <div className="max-w-4xl max-h-[90vh]">
          <img 
            src={imageUrl} 
            alt="Enlarged screenshot" 
            className="w-full h-full object-contain border-4 border-white/10 rounded-lg shadow-2xl" 
          />
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute -right-16 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Next"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
