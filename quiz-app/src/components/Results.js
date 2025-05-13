"use client";

import React from 'react';
import Explanation from './Explanation'; // We'll create this component next

// Define props for TypeScript, if you convert this to .tsx
// interface ResultsProps {
//   quizData: Array<{
//     questionId: string;
//     questionStem: string;
//     options: Array<{ optionId: string; optionText: string; isCorrect?: boolean; rationaleForOption?: string }>;
//     detailedCorrectAnswerExplanation?: string;
//     sourceReferences?: Array<{ sourceType: string; identifier: string; specificContext?: string }>;
//   }>;
//   userAnswers: { [questionId: string]: { optionId: string } };
// }

function Results({ quizData, userAnswers }) {
  if (!quizData || quizData.length === 0) {
    return <p className="text-center text-gray-600">No quiz data to display results.</p>;
  }

  let score = 0;
  quizData.forEach(question => {
    const userAnswer = userAnswers[question.questionId];
    const correctOption = question.options.find(opt => opt.isCorrect);
    if (userAnswer && correctOption && userAnswer.optionId === correctOption.optionId) {
      score++;
    }
  });

  return (
    <div className="p-1">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Quiz Results</h2>
      <p className="text-xl mb-8 text-center text-gray-700">
        Your score: <strong className="text-indigo-600">{score}</strong> out of <strong className="text-indigo-600">{quizData.length}</strong>
      </p>
      
      <div className="space-y-8">
        {quizData.map((question, index) => {
          const userAnswerForQuestion = userAnswers[question.questionId];
          const correctOption = question.options.find(opt => opt.isCorrect);
          const selectedOptionByUser = question.options.find(
            opt => userAnswerForQuestion && opt.optionId === userAnswerForQuestion.optionId
          );
          const isCorrect = selectedOptionByUser && correctOption && selectedOptionByUser.optionId === correctOption.optionId;

          return (
            <div 
              key={question.questionId} 
              className={`p-6 rounded-lg shadow-md ${isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}
            >
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Question {index + 1}: {question.questionStem}
              </p>
              
              <div className="mb-3">
                <span className="font-medium text-gray-700">Your answer: </span>
                {selectedOptionByUser ? (
                  <span className={`${isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}`}>
                    {selectedOptionByUser.optionText}
                    {isCorrect ? " (Correct)" : " (Incorrect)"}
                  </span>
                ) : (
                  <span className="text-gray-500 italic">Not answered</span>
                )}
              </div>

              {!isCorrect && correctOption && (
                <p className="mb-3">
                  <span className="font-medium text-gray-700">Correct answer: </span>
                  <span className="text-green-700">{correctOption.optionText}</span>
                </p>
              )}

              <Explanation
                question={question}
                selectedOption={selectedOptionByUser}
                correctOption={correctOption}
              />

              {question.sourceReferences && question.sourceReferences.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <strong className="text-sm text-gray-600">Source(s):</strong>
                  <ul className="list-disc list-inside pl-2 mt-1 text-xs text-gray-500">
                    {question.sourceReferences.map((ref, i) => (
                      <li key={i}>
                        {ref.sourceType}: {ref.identifier} 
                        {ref.specificContext && ` (${ref.specificContext})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
