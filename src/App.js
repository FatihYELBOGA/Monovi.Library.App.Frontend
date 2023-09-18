import React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import Register from './Login/Register';
import NavBar from './Navbar/Navbar';
import BookDetails from './Book/BookDetails';
import Profile from './Profile/Profile';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import About from './About/About';
import Footer from './Footer/Footer';
import Authors from './Authors/Authors';
import AuthorDetails from './Authors/AuthorDetails';

function App() {
  console.log(localStorage.getItem("userId"))
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  console.log(userId);
  if (userId === null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login setUserId={setUserId} setJwtToken={setJwtToken} />} />
          <Route exact path='/sign-up' element={<Register setUserId={setUserId} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
      <div id="container">

        <div id="header">
        <NavBar userId={userId} setUserId={setUserId}></NavBar>
        </div>

        <div id="body-container">
        <Routes>
          <Route exact path='/home' element={<Home setUserId={setUserId} />} />
          <Route exact path='/book-details/:id' element={<BookDetails userId={userId} />} />
          <Route exact path='/profile' element={<Profile userId={userId} />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/authors' element={<Authors/>}/>
          <Route exact path='/author-details/1' element={<AuthorDetails/>}/>
        </Routes>

        </div>

        <div id="">
        <Footer />
        </div>
        
        </div>
      
        
        
        
      </BrowserRouter>
    );
  }
}

export default App;
