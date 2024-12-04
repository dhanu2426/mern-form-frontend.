// src/components/FormEditor.js
import React, { useState } from "react";

function FormEditor() {
  // State to store form title and questions
  const [formTitle, setFormTitle] = useState(""); 
  const [questions, setQuestions] = useState([
    { question: "", type: "text" }, // Initialize with a default question
  ]);

  // Handle changes to the form title
  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  // Handle changes to the question text
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Handle changes to the question type (text, categorize, cloze, comprehension)
  const handleQuestionTypeChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Add a new question to the form
  const addQuestion = () => {
    setQuestions([...questions, { question: "", type: "text" }]);
  };

  // Handle form submission (save form to the backend)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      title: formTitle,
      questions: questions.map((q) => q.question),
    };

    try {
      // Sending form data to the backend to save
      const response = await fetch("http://localhost:5001/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.message); // Log success message
    } catch (error) {
      console.error("Error saving form:", error); // Log errors
    }
  };

  return (
    <div className="form-editor">
      <h1>Create Your Form</h1>
      
      {/* Input for the form title */}
      <input
        type="text"
        value={formTitle}
        onChange={handleTitleChange}
        placeholder="Form Title"
        className="p-2 border-2 border-gray-300 rounded mb-4"
      />

      {/* Render questions dynamically */}
      {questions.map((q, index) => (
        <div key={index} className="question-container mb-4">
          {/* Input for each question */}
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e)}
            placeholder={`Question ${index + 1}`}
            className="p-2 border-2 border-gray-300 rounded mb-2"
          />
          
          {/* Select for choosing question type */}
          <select
            value={q.type}
            onChange={(e) => handleQuestionTypeChange(index, e)}
            className="p-2 border-2 border-gray-300 rounded"
          >
            <option value="text">Text</option>
            <option value="categorize">Categorize</option>
            <option value="cloze">Cloze</option>
            <option value="comprehension">Comprehension</option>
          </select>
        </div>
      ))}

      {/* Buttons for adding a new question and submitting the form */}
      <button onClick={addQuestion} className="p-2 bg-blue-500 text-white rounded mb-4">
        Add Question
      </button>
      <button onClick={handleSubmit} className="p-2 bg-green-500 text-white rounded">
        Save Form
      </button>
    </div>
  );
}

export default FormEditor;
