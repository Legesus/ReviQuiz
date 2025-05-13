"use client";

import React from 'react';

// Define props for TypeScript, if you convert this to .tsx
// interface ExplanationProps {
//   question: {
//     detailedCorrectAnswerExplanation?: string;
//   };
//   selectedOption?: {
//     isCorrect?: boolean;
//     rationaleForOption?: string;
//   };
//   correctOption?: { // Not strictly needed if detailedCorrectAnswerExplanation is always from the question
//     // optionText?: string; 
//   };
// }

function Explanation({ question, selectedOption, correctOption }) {
  // Ensure props exist to prevent errors
  if (!question) return null;

  const showRationaleForIncorrect = selectedOption && !selectedOption.isCorrect && selectedOption.rationaleForOption;
  const showDetailedExplanation = question.detailedCorrectAnswerExplanation;

  if (!showRationaleForIncorrect && !showDetailedExplanation) {
    return null; // Don't render anything if there's no explanation text
  }

  return (
    <div className="mt-4 p-4 border-l-4 border-gray-300 bg-gray-50 rounded-r-md text-sm">
      {showRationaleForIncorrect && (
        <div className="mb-3">
          <p className="font-semibold text-gray-700">Why your choice was incorrect:</p>
          <p className="text-gray-600 whitespace-pre-wrap">{selectedOption.rationaleForOption}</p>
        </div>
      )}
      {showDetailedExplanation && (
        <div>
          <p className="font-semibold text-gray-700">Explanation of correct answer:</p>
          <p className="text-gray-600 whitespace-pre-wrap">{question.detailedCorrectAnswerExplanation}</p>
        </div>
      )}
    </div>
  );
}

export default Explanation;
