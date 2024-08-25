import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import OutputDisplay from "./outdisplay"; // Import the OutputDisplay component
import "bootstrap/dist/css/bootstrap.min.css";

function FilterableMultiSelectDropdown({ data }) {
  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to store the filtered data

  const options = ["Numbers", "Alphabets", "Higest lowercase Alphabet"];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSelect = (option) => {
    const updatedSelectedItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(updatedSelectedItems);

    // Filter data based on selected items
    const newFilteredData = [];

    if (updatedSelectedItems.includes("Numbers")) {
      newFilteredData.push(...data.numbers);
    }
    if (updatedSelectedItems.includes("Alphabets")) {
      newFilteredData.push(...data.alphabets);
    }
    if (updatedSelectedItems.includes("Lowercase Alphabet")) {
      newFilteredData.push(...data.lowercase_alphabet);
    }

    setFilteredData(newFilteredData);
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

      {/* Conditionally render OutputDisplay only when there's filtered data */}
      {filteredData.length > 0 && (
        <OutputDisplay
          title="Filtered Output"
          content={filteredData.join(", ")}
        />
      )}
    </div>
  );
}

export default FilterableMultiSelectDropdown;
