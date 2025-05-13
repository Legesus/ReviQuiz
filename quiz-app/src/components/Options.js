"use client";

import React from 'react';

// Define props for TypeScript, if you convert this to .tsx
// interface OptionProps {
//   option: { optionId: string; optionText: string };
//   questionId: string;
//   onAnswerSelect: (questionId: string, optionId: string) => void;
//   isSelected: boolean;
// }

function Options({ option, questionId, onAnswerSelect, isSelected }) {
  return (
    <button
      onClick={() => onAnswerSelect(questionId, option.optionId)}
      className={`
        w-full text-left p-3 my-2 rounded-md border transition-all duration-150 ease-in-out
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400
        ${isSelected ? 'bg-indigo-500 text-white hover:bg-indigo-600 ring-2 ring-indigo-500' : 'bg-white text-gray-700 border-gray-300'}
      `}
    >
      {option.optionText}
    </button>
  );
}

export default Options;
