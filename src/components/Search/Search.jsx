import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
import { IoIosSearch } from "react-icons/io";
function Search({ files = [], facultyList = [] }) {
  const [input, setInput] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Filter files by tags
  const filteredFiles = Array.isArray(files) 
    ? files.filter(file => 
        Array.isArray(file.tags) &&
        file.tags.some(tag => tag.toLowerCase().includes(input.toLowerCase()))
      )
    : [];

  // Filter faculty by name
  const matchedFaculty = facultyList.find(faculty => 
    faculty.name.toLowerCase().includes(input.toLowerCase())
  );

  // Handle search input
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setSelectedFaculty(matchedFaculty || null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="search-bar-container">
      <Form className="search-bar" onSubmit={handleSubmit}>
        <InputGroup className="m-2">
          <InputGroup.Text>
            <IoIosSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by tags or faculty name"
            value={input}
            onChange={handleInputChange}
          />
        </InputGroup>
      </Form>
    </div>
  )
}

export default Search