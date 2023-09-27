import React, { useState, useEffect } from 'react';
import Author from './Author';
import './Authors.css';

function Authors(props) {
  const {role} = props;
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const itemsPerPage = 3; // Number of authors to display per page
  const [authorRender,setAuthorRender] = useState(false);


  useEffect(() => {
    fetch(`http://fatihyelbogaa-001-site1.htempurl.com/writers/pagination?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
      .then((res) => {
        if (res.status === 204) {
          return Promise.resolve([]);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAuthors(result.content);
          setTotalPage(result.totalPages);
          setFilteredAuthors(result.content); // Initialize filteredAuthors with all authors
        },
        (error) => {
          setIsLoaded(true);
        }
      );
  }, [currentPage,authorRender]); // Include currentPage in the dependency array to fetch data when the page changes

  // Handle input change in the search bar
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter authors based on the search term
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(searchTerm) ||
        author.lastName.toLowerCase().includes(searchTerm)
    );

    setFilteredAuthors(filtered);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  // Handle pagination button click
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          <Author role={role} author={author} key={author.id} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? 'active' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Authors;
