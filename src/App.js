import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

function App() {
  // State to manage the form data
  const [formData, setFormData] = useState({
    title: "",
    headerImage: "",
    questions: [],
  });

  // Handle form data updates
  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleHeaderImageChange = (e) => {
    setFormData({ ...formData, headerImage: e.target.value });
  };

  // Add question handler for form editor
  const handleAddQuestion = (questionType) => {
    const newQuestion = {
      type: questionType,
      content: "",
      options: [],
    };
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  // Handle question content change
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].content = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle question options for Categorize and Cloze
  const handleOptionsChange = (index, options) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].options = options;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle saving the form to the backend using axios
  const handleSaveForm = () => {
    // Using axios to send a POST request with formData
    axios
      .post("https://mern-form-backend-0qjv.onrender.com/forms", formData) // Send formData as the request body
      .then((response) => {
        console.log("Form saved:", response.data); // handle success
      })
      .catch((error) => {
        console.error("Error saving form:", error); // handle error
      });
  };

  return (
    <div className="App">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Form Editor</h1>

        {/* Form Title Input */}
        <input
          type="text"
          className="w-full p-4 mb-4 border rounded-lg"
          placeholder="Enter Form Title"
          value={formData.title}
          onChange={handleTitleChange}
        />

        {/* Header Image Input */}
        <input
          type="text"
          className="w-full p-4 mb-4 border rounded-lg"
          placeholder="Enter Header Image URL"
          value={formData.headerImage}
          onChange={handleHeaderImageChange}
        />

        {/* Display Header Image if URL is provided */}
        {formData.headerImage && (
          <img
            src={formData.headerImage}
            alt="Header"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Add Question Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleAddQuestion("Categorize")}
          >
            Add Categorize Question
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleAddQuestion("Cloze")}
          >
            Add Cloze Question
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleAddQuestion("Comprehension")}
          >
            Add Comprehension Question
          </button>
        </div>

        {/* Render Questions */}
        {formData.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <textarea
              className="w-full p-4 border rounded-lg mb-4"
              placeholder="Enter your question"
              value={question.content}
              onChange={(e) => handleQuestionChange(index, e)}
            />

            {/* Render options for Categorize or Cloze */}
            {question.type === "Categorize" || question.type === "Cloze" ? (
              <div>
                <textarea
                  className="w-full p-4 border rounded-lg mb-4"
                  placeholder="Enter options (comma separated)"
                  value={question.options.join(", ")}
                  onChange={(e) =>
                    handleOptionsChange(index, e.target.value.split(", "))
                  }
                />
              </div>
            ) : null}
          </div>
        ))}

        {/* Save Form Button */}
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={handleSaveForm}
        >
          Save Form
        </button>
      </div>
    </div>
  );
}

export default App;
