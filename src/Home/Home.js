import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://fatihyelbogaa-001-site1.htempurl.com/books')
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
          setBooks(result);
          setFilteredBooks(result); // Initialize filteredBooks with all books
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

    // Filter books based on the search term
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm) ||
      book.writer.firstName.toLowerCase().includes(searchTerm)
    );

    setFilteredBooks(filtered);
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
    </div>
  );
}

export default Home;
