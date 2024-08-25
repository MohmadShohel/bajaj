import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FilterableMultiSelectDropdown from "./filter"; // Import the dropdown component
import "bootstrap/dist/css/bootstrap.min.css";

export const FormComponent = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null); // State to store the API response
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission status

  const handleInputChange = (event) => {
    const userInput = event.target.value;

    try {
      // Attempt to parse the input as JSON
      const parsedJson = JSON.parse(userInput);
      setInput(parsedJson); // Only set the input if it's valid JSON
      setError(""); // Clear any previous error messages
    } catch (err) {
      // If the input is not valid JSON, set an error message
      setError("Invalid JSON input. Please provide a valid JSON string.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch(
        "https://pewegetqyt.ap-south-1.awsapprunner.com/bfhl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input), // Convert input back to JSON string
        }
      );

      const result = await response.json();
      setResponse(result); // Store the API response in state
      setIsSubmitted(true); // Set submission status to true upon success
      console.log("Submitted JSON:", input);
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("Failed to submit data. Please try again later.");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formJsonInput">
          <Form.Label>API Input</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter JSON"
            onChange={handleInputChange}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Pass the API response as a prop to the dropdown component */}
      {isSubmitted && response && (
        <FilterableMultiSelectDropdown data={response} />
      )}
    </div>
  );
};

export default FormComponent;
