import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const itemsPerPage = 3; // Number of books to display per page

  useEffect(() => {
    console.log(currentPage)
    fetch(`http://fatihyelbogaa-001-site1.htempurl.com/books/pagination?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
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
          setBooks(result.content);
          setFilteredBooks(result.content); // Initialize filteredBooks with all books
          setTotalPage(result.totalPages);
        },
        (error) => {
          setIsLoaded(true);
        }
      );
  }, [currentPage]); // Include currentPage in the dependency array to fetch data when the page changes

  // Handle input change in the search bar
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter books based on the search term
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchTerm) ||
        book.writer.firstName.toLowerCase().includes(searchTerm)
    );

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Slice the books array to display only the current page
  


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
          placeholder="Search Books"
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
          paddingTop: 50,
        }}
      >
        {filteredBooks.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div style={{ textAlign: 'center', marginTop: 50,marginBottom:40 }}>
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

export default Home;
