import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login/Login'
import Register from './Login/Register';
import NavBar from './Navbar/Navbar';
import Home from './Home/Home';

function App() {
  const [userId,setUserId] = useState(localStorage.getItem("userId"));

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
      <NavBar setUserId={setUserId}></NavBar>
        <Routes>
        <Route exact path='/home' element={<Home setUserId={setUserId} />}/>
          
        </Routes>
      
      </BrowserRouter>
    );

  }
  
}

export default App;
