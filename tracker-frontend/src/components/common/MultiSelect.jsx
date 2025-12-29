import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ label, options, selectedValues, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option) => {
    let newSelected;
    if (selectedValues.includes(option)) {
      newSelected = selectedValues.filter((item) => item !== option);
    } else {
      newSelected = [...selectedValues, option];
    }
    onChange(newSelected);
  };

  const removeValue = (e, value) => {
    e.stopPropagation();
    onChange(selectedValues.filter((item) => item !== value));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-gray-400 text-sm font-medium mb-1">
        {label}
      </label>
      <div
        className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer min-h-[42px] flex flex-wrap gap-2 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          selectedValues.map((value) => (
            <span
              key={value}
              className="bg-cyan-900/50 text-cyan-200 text-xs px-2 py-1 rounded flex items-center gap-1"
            >
              {value}
              <button
                type="button"
                onClick={(e) => removeValue(e, value)}
                className="hover:text-white"
              >
                &times;
              </button>
            </span>
          ))
        )}
        <div className="ml-auto text-gray-400">
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.length === 0 ? (
             <div className="p-3 text-gray-500 text-center text-sm">No options available</div>
          ) : (
            options.map((option) => (
              <div
                key={option}
                className={`px-4 py-2 cursor-pointer text-sm flex items-center justify-between hover:bg-slate-700 ${
                  selectedValues.includes(option) ? "text-cyan-400 bg-slate-700/50" : "text-gray-300"
                }`}
                onClick={() => toggleOption(option)}
              >
                <span>{option}</span>
                {selectedValues.includes(option) && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
