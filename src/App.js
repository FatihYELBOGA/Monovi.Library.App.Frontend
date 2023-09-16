import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login/Login'
import Register from './Login/Register';
import NavBar from './Navbar/Navbar';
import BookDetails from './Book/BookDetails';
import Profile from './Profile/Profile';
import Home from './Home/Home';
import Contact from './Contact/Contact';

function App() {
  console.log(localStorage.getItem("userId"))
  const [userId,setUserId] = useState(localStorage.getItem("userId"));
  console.log(userId);
  if(userId === null){
    return(
      <BrowserRouter>
     
        <Routes>
          <Route exact path='/' element={<Login setUserId={setUserId} />}/>
          <Route exact path='/sign-up' element={<Register setUserId={setUserId}/>}/>
        </Routes>
      
      </BrowserRouter>
    )
  }else{
    return (
      <BrowserRouter>
      <NavBar userId={userId} setUserId={setUserId}></NavBar>
        <Routes>
        <Route exact path='/home' element={<Home setUserId={setUserId} />}/>
        <Route exact path ='/book-details/:id' element={<BookDetails/>}/>
        <Route exact path='/profile' element={<Profile userId={userId}/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        </Routes>
      
      </BrowserRouter>
    );

  }
  
}

export default App;
