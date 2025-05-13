"use client";

import React from 'react';
import Options from './Options'; // Assuming Options.js is in the same directory

// Define props for TypeScript, if you convert this to .tsx
// interface QuestionDisplayProps {
//   question: {
//     questionId: string;
//     questionStem: string;
//     options: Array<{ optionId: string; optionText: string }>;
//     subjectArea?: string;
//     topicHierarchy?: { level1_topic?: string; level2_topic?: string };
//   };
//   onAnswerSelect: (questionId: string, optionId: string) => void;
//   userAnswer?: { optionId: string };
// }

function QuestionDisplay({ question, onAnswerSelect, userAnswer }) {
  if (!question) {
    return (
      <div className="p-4 text-center text-gray-600">
        <p>Loading question...</p>
      </div>
    );
  }

  return (
    <div className="p-1 rounded-lg">
      <h2 className="text-xl font-semibold mb-5 text-gray-800 leading-tight">{question.questionStem}</h2>
      
      {/* Optional: Display subject and topic hierarchy if available */}
      {/* 
      {(question.subjectArea || question.topicHierarchy) && (
        <div className="mb-4 text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
          {question.subjectArea && <p><strong>Subject:</strong> {question.subjectArea}</p>}
          {question.topicHierarchy?.level1_topic && (
            <p>
              <strong>Topic:</strong> {question.topicHierarchy.level1_topic}
              {question.topicHierarchy.level2_topic && ` > ${question.topicHierarchy.level2_topic}`}
            </p>
          )}
        </div>
      )}
      */}

      <div className="space-y-2">
        {question.options.map((option) => (
          <Options
            key={option.optionId} // React key for list items
            option={option}
            questionId={question.questionId}
            onAnswerSelect={onAnswerSelect}
            isSelected={userAnswer && userAnswer.optionId === option.optionId}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionDisplay;
