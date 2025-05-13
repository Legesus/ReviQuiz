"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import FileUploader from "../src/components/FileUploader";
import QuestionDisplay from "../src/components/QuestionDisplay";
import Results from "../src/components/Results";

// Define basic types for the quiz data for better type safety
// You should expand these based on your detailed JSON structure
interface Option {
  optionId: string;
  optionText: string;
  isCorrect?: boolean;
  rationaleForOption?: string;
}

interface Question {
  questionId: string;
  questionStem: string;
  options: Option[];
  detailedCorrectAnswerExplanation?: string;
  sourceReferences?: Array<{
    sourceType: string;
    identifier: string;
    specificContext?: string;
  }>;
  // Add other fields from your JSON structure as needed
  subjectArea?: string;
  topicHierarchy?: { level1_topic?: string; level2_topic?: string; level3_topic?: string };
}

interface UserAnswers {
  [questionId: string]: { optionId: string };
}

export default function HomePage() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (jsonData: Question[], uploadedFileName: string) => {
    // Basic validation: Check if jsonData is an array and not empty
    if (Array.isArray(jsonData) && jsonData.length > 0) {
      setQuizData(jsonData);
      setFileName(uploadedFileName);
      setQuizStarted(true);
      setQuizFinished(false);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
    } else {
      console.error("Invalid quiz data format:", jsonData);
      alert("The uploaded JSON file does not contain a valid quiz structure (expected an array of questions).");
      // Reset states if file is invalid
      setQuizData([]);
      setFileName("");
      setQuizStarted(false);
    }
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { optionId },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last question, consider submitting the quiz
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    setQuizFinished(true);
  };

  const restartQuiz = () => {
    setQuizData([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizStarted(false);
    setQuizFinished(false);
    setFileName("");
  };

  if (!quizStarted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-8 bg-slate-100 dark:bg-slate-900">
        <div className="w-full max-w-lg p-8 sm:p-10 bg-white dark:bg-slate-800 rounded-xl shadow-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-slate-700 dark:text-slate-200">
            Quiz Master
          </h1>
          <p className="mb-6 text-base text-slate-600 dark:text-slate-400 text-center">
            Upload your quiz JSON file to begin an exciting learning session!
          </p>
          <FileUploader onFileUpload={handleFileUpload} setFileName={setFileName} />
        </div>
      </main>
    );
  }

  if (quizFinished) {
    return (
      <main className="flex min-h-screen flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="w-full max-w-4xl p-8 sm:p-10 bg-white dark:bg-slate-800 rounded-xl shadow-2xl">
          <Results quizData={quizData} userAnswers={userAnswers} />
          <button
            onClick={restartQuiz}
            className="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
          >
            Take Another Quiz
          </button>
        </div>
      </main>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-8 bg-slate-100 dark:bg-slate-900">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Question not found. The quiz data might be corrupted or incomplete.
          </p>
          <button
            onClick={restartQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-colors duration-150"
          >
            Upload New Quiz
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-3xl p-8 sm:p-10 bg-white dark:bg-slate-800 rounded-xl shadow-2xl">
        <div className="mb-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Quiz File: {fileName}</p>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
            Question {currentQuestionIndex + 1}{" "}
            <span className="text-base font-normal text-slate-500 dark:text-slate-400">of {quizData.length}</span>
          </p>
          {currentQuestion.subjectArea && (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">Subject: {currentQuestion.subjectArea}</p>
          )}
          {currentQuestion.topicHierarchy?.level1_topic && (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Topic: {currentQuestion.topicHierarchy.level1_topic}{" "}
              {currentQuestion.topicHierarchy.level2_topic && `> ${currentQuestion.topicHierarchy.level2_topic}`}
            </p>
          )}
        </div>

        <QuestionDisplay
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          userAnswer={userAnswers[currentQuestion.questionId]}
        />

        <button
          onClick={handleNextQuestion}
          disabled={!userAnswers[currentQuestion.questionId]} // Disable if no answer selected
          className={`
            mt-10 w-full font-semibold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-opacity-50
            ${!userAnswers[currentQuestion.questionId]
              ? "bg-slate-400 dark:bg-slate-600 text-slate-100 dark:text-slate-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-400"}
          `}
        >
          {currentQuestionIndex < quizData.length - 1 ? "Next Question" : "View Results"}
        </button>
      </div>
    </main>
  );
}
