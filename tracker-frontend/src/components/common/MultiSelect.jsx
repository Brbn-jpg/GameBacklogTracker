import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ label, options, selectedValues, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      {label && (
        <label className="block text-sm font-black uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div
        className="w-full bg-white neo-border-thick p-3 text-black font-bold focus-within:bg-yellow-50 cursor-pointer min-h-[52px] flex flex-wrap gap-2 items-center neo-transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length === 0 ? (
          <span className="text-gray-400 uppercase text-xs">{placeholder}</span>
        ) : (
          selectedValues.map((value) => (
            <span
              key={value}
              className="bg-cyan-400 text-black text-xs font-black uppercase px-2 py-1 neo-border flex items-center gap-1"
            >
              {value}
              <button
                type="button"
                onClick={(e) => removeValue(e, value)}
                className="hover:bg-black hover:text-white px-1 transition-colors"
              >
                &times;
              </button>
            </span>
          ))
        )}
        <div className="ml-auto">
          <svg
            className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-2 bg-white neo-border-thick neo-shadow-lg max-h-64 overflow-y-auto">
          {options.length === 0 ? (
             <div className="p-4 text-black font-black uppercase text-center text-sm italic">No options</div>
          ) : (
            options.map((option) => (
              <div
                key={option}
                className={`px-4 py-3 cursor-pointer text-sm font-black uppercase flex items-center justify-between border-b-2 border-black last:border-b-0 hover:bg-yellow-400 ${
                  selectedValues.includes(option) ? "bg-yellow-400" : "bg-white"
                }`}
                onClick={() => toggleOption(option)}
              >
                <span>{option}</span>
                {selectedValues.includes(option) && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="4" d="M5 13l4 4L19 7" />
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
