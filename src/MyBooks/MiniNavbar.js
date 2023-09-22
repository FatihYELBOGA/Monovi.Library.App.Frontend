import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const sidebarStyle = {
  width: '12%',
  minWidth: '150px', // Adjust the sidebar width as needed
  borderRight: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#5F5F5F',
  flex: '0.3', // Make the sidebar grow to occupy available space
  minHeight: '100vh', // Set a minimum height to cover the whole body
};

const linkStyle = {
  textDecoration: 'none',
  padding: '15px',
  borderBottom: '2px solid transparent',
  transition: 'border-color 0.3s ease',
  color: 'white', // Adjust link color
  fontWeight: 'bold',
  fontSize: '20px',
  borderBottom: '1px solid grey',
  flex: '0.5', // Distribute available space evenly among links
};

const activeLinkStyle = {
  borderColor: '#1976D2', // Adjust the active link color
  fontWeight: 'bold', // Add bold font for active link
  color: '#1976D2', // Adjust the active link text color
};

const MiniNavbar = () => {
  return (
    <div style={sidebarStyle}>
       <div style={{marginTop:"100%",display:"flex",flexDirection:"column"}}>
      <Link to="/my-books" style={linkStyle} activeClassName="active" activeStyle={activeLinkStyle}>
        My Books
      </Link>
      <Link to="/favorites-books" style={linkStyle} activeClassName="active" activeStyle={activeLinkStyle}>
        Favorites
      </Link>
      <Link to="/sharing-books" style={linkStyle} activeClassName="active" activeStyle={activeLinkStyle}>
        Sharings
      </Link>
      <Link to="/add-book" style={linkStyle} activeClassName="active" activeStyle={activeLinkStyle}>
        Add Book
      </Link>
      </div>
      
    </div>
  );
};

export default MiniNavbar;

// Layout structure


