import React, { useState, useEffect } from 'react';
import Author from './Author';
import './Authors.css'

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://fatihyelbogaa-001-site1.htempurl.com/writers')
      .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAuthors(result);
          setFilteredAuthors(result); // Initialize filteredAuthors with all authors
        },
        (error) => {
          setIsLoaded(true);
        }
      );
  }, []);

  // Handle input change in the search bar
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    // Filter authors based on the search term
    const filtered = authors.filter((author) =>
      author.firstName.toLowerCase().includes(searchTerm) ||
      author.lastName.toLowerCase().includes(searchTerm)
    );
  
    setFilteredAuthors(filtered);
  };
  

  return (
    <div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Authors"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          marginTop: 20,
        }}
      >
        {filteredAuthors.map((author) => (
          <Author author={author} key={author.id} />
        ))}
      </div>
    </div>
  );
}

export default Authors;
