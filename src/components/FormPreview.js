// src/components/FormPreview.js
// src/components/FormPreview.js
import React, { useState, useEffect } from "react";

function FormPreview({ formId }) {
  const [form, setForm] = useState(null);

  // Fetch form data by ID
  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetch(`http://localhost:5001/forms/${formId}`);
      const data = await response.json();
      setForm(data);
    };
    fetchForm();
  }, [formId]);

  // Handle response submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answers = [];
    for (let i = 0; i < form.questions.length; i++) {
      answers.push(formData.get(`question${i}`));
    }

    const response = await fetch(`http://localhost:5001/forms/${form._id}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: null, answers }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="form-preview">
      <h1>{form.title}</h1>
      <form onSubmit={handleSubmit}>
        {form.questions.map((q, index) => (
          <div key={index} className="question">
            <label>{q}</label>
            <input type="text" name={`question${index}`} className="response-input" />
          </div>
        ))}
        <button type="submit">Submit Responses</button>
      </form>
    </div>
  );
}

export default FormPreview;
