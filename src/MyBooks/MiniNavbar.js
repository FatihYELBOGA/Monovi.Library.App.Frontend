import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const MiniNavbar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1px solid #ccc',
    }}>
      <Link
        to="/my-books"
        style={{
          textDecoration: 'none',
          padding: '10px 15px', // Adjusted padding
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
        activeClassName="active"
      >
        My Books
      </Link>
      <Link
        to="/favorites-books"
        style={{
          textDecoration: 'none',
          padding: '10px 15px', // Adjusted padding
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
        activeClassName="active"
      >
        Favorite Books
      </Link>
      <Link
        to="/sharing-books"
        style={{
          textDecoration: 'none',
          padding: '10px 15px', // Adjusted padding
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
        activeClassName="active"
      >
        Sharing Books
      </Link>
      <Link
        to="/add-book"
        style={{
          textDecoration: 'none',
          padding: '10px 15px', // Adjusted padding
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
        activeClassName="active"
      >
        Add Books
      </Link>
    </div>
  );
};

export default MiniNavbar;
