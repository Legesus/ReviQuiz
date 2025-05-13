"use client"; // Required for event handlers in Next.js App Router components

import React from 'react';

function FileUploader({ onFileUpload, setFileName }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/json") {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const fileContent = e.target.result;
            const jsonData = JSON.parse(fileContent);

            // Validate the basic structure (is it an array of questions?)
            // And ensure each question has a questionId and options
            if (Array.isArray(jsonData) && 
                jsonData.length > 0 &&
                jsonData.every(q => q.questionId && Array.isArray(q.options) && q.options.length > 0)) {
              onFileUpload(jsonData, file.name);
            } else {
              console.error("Invalid JSON structure:", jsonData);
              alert("Invalid JSON file: Expected an array of questions, each with a 'questionId' and 'options' array.");
              // Clear the file input if the file is invalid
              event.target.value = null; 
              setFileName(''); // Reset filename display
            }
          } catch (error) {
            console.error("Error parsing JSON file:", error);
            alert("Error parsing JSON file. Please ensure it's valid JSON.");
            event.target.value = null;
            setFileName('');
          }
        };
        reader.onerror = () => {
            console.error("Error reading file:", reader.error);
            alert("Error reading file.");
            event.target.value = null;
            setFileName('');
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a valid JSON file (must have a .json extension and be of type application/json).");
        event.target.value = null;
        setFileName('');
      }
    } else {
      // No file selected, or selection was cancelled
      setFileName('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label 
        htmlFor="file-upload" 
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">Quiz JSON file (.json)</p>
        </div>
        <input 
          id="file-upload" 
          type="file" 
          accept=".json,application/json" 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </label>
    </div>
  );
}

export default FileUploader;
