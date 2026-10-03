import React, { useState, useContext, useRef, useEffect } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function Header({ onAddNew }) {
  const { feedbackData, sortBy, setSortBy } = useContext(FeedbackContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalSuggestions = feedbackData?.productRequests?.length || 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { id: "most-upvotes", label: "Most Upvotes" },
    { id: "least-upvotes", label: "Least Upvotes" },
    { id: "most-comments", label: "Most Comments" },
    { id: "least-comments", label: "Least Comments" },
  ];

  const currentLabel =
    sortOptions.find((opt) => opt.id === sortBy)?.label || "Most Upvotes";

  return (
    <header className="bg-[#373F68] text-white rounded-xl p-4 md:px-6 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-start">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xl">💡</span>
          <span className="font-bold text-lg">
            {totalSuggestions} Suggestions
          </span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#F2F4FF]/70">Sort by :</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="font-bold text-white flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
            >
              {currentLabel}
              <span
                className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                ⌄
              </span>
            </button>
          </div>

          {isOpen && (
            <div className="absolute left-0 sm:left-auto sm:right-0 mt-4 w-56 bg-white rounded-xl shadow-2xl border border-[#3A4374]/10 text-[#647196] z-50 overflow-hidden divide-y divide-[#3A4374]/10">
              {sortOptions.map((option) => {
                const isSelected = sortBy === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-6 py-3 text-left text-sm flex items-center justify-between hover:text-[#AD1FEA] transition-colors cursor-pointer ${
                      isSelected ? "text-[#3A4374] font-bold" : ""
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <span className="text-[#AD1FEA] font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onAddNew}
        className="w-full sm:w-auto bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
      >
        + Add Feedback
      </button>
    </header>
  );
}
