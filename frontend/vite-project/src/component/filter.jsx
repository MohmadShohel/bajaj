import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import OutputDisplay from "./outdisplay"; // Import the OutputDisplay component
import "bootstrap/dist/css/bootstrap.min.css";

function FilterableMultiSelectDropdown({ data }) {
  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]); // State to store the filtered numbers
  const [filteredAlphabets, setFilteredAlphabets] = useState([]); // State to store the filtered alphabets
  const [highestLowercaseAlphabet, setHighestLowercaseAlphabet] = useState(""); // State to store the highest lowercase alphabet

  const options = ["Numbers", "Alphabets", "Higest lowercase Alphabet"];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSelect = (option) => {
    const updatedSelectedItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(updatedSelectedItems);

    if (updatedSelectedItems.includes("Numbers")) {
      setFilteredNumbers(data.numbers);
    } else {
      setFilteredNumbers([]);
    }

    if (updatedSelectedItems.includes("Alphabets")) {
      setFilteredAlphabets(data.alphabets);
    } else {
      setFilteredAlphabets([]);
    }

    if (updatedSelectedItems.includes("Higest lowercase Alphabet")) {
      const highestLowercase = String.fromCharCode(
        Math.max(...data.lowercase_alphabet.map((char) => char.charCodeAt(0)))
      );
      setHighestLowercaseAlphabet(highestLowercase);
    } else {
      setHighestLowercaseAlphabet("");
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "20px" }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedItems.length > 0
            ? selectedItems.join(", ")
            : "Select options"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <FormControl
            autoFocus
            placeholder="Type to filter..."
            onChange={handleFilterChange}
            value={filter}
            style={{ margin: "10px" }}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSelect(option)}
                active={selectedItems.includes(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(option)}
                  onChange={() => handleSelect(option)}
                  style={{ marginRight: "10px" }}
                />
                {option}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No results found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* Conditionally render OutputDisplay components for each category */}
      {filteredNumbers.length > 0 && (
        <OutputDisplay title="Numbers" content={filteredNumbers.join(", ")} />
      )}
      {filteredAlphabets.length > 0 && (
        <OutputDisplay
          title="Alphabets"
          content={filteredAlphabets.join(", ")}
        />
      )}
      {highestLowercaseAlphabet && (
        <OutputDisplay
          title="Highest Lowercase Alphabet"
          content={highestLowercaseAlphabet}
        />
      )}
    </div>
  );
}

export default FilterableMultiSelectDropdown;
