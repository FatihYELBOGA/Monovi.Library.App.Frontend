import React, { useState } from 'react';
import {
  TextField,
  Button,
  CssBaseline,
  Grid,
} from '@mui/material';
import MonoviLogo from '../image/monovi-logo.png';
import background from '../image/pexels-ricky-esquivel-1907785.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '35px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)', // Box shadow
};

const formStyle = {
  width: '100%',
  marginTop: '8px',
};

const submitButtonStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  height:'18%',
  margin: '24px 0 16px',
  backgroundColor: '#B00000',
};
//linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),

const imageStyle = {
  backgroundImage: '  url(' + background + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: 'transparent', // Remove the semi-transparent background color
}


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = props;
  const navigate = useNavigate(); // Remove unnecessary curly braces
  const [isSignUp,setIsSignUp] = useState(true);

  const topButtontyle = {
  
    width: "45%",
    height: "50px",
    marginLeft:" 2px",
    color:  "black",
    marginTop: "5px",
    
    padding: '0px 0px',
    backgroundColor: "",
    borderRadius: '5px 5px 0px 0px',
    backgroundColor: isSignUp ? "rgba(255, 255, 255, 0.8)":"white",
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)', // Box shadow
  
  };
  const topButtontyle2 = {
    width: "45%",
    height: "50px",
    marginTop: "5px",
    marginLeft:" 2px",
    color: "black",
    padding: '15px 60px',
    backgroundColor: "",
    borderRadius: '5px 5px 0px 0px',
    backgroundColor: isSignUp ?  "white":"rgba(255, 255, 255, 0.8)",
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)', // Box shadow
  
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Email",email);
    formData.append("Password",password);
    fetch('http://fatihyelbogaa-001-site1.htempurl.com/auth/login', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id != null) {
          console.log(res.id)
          setUserId(res.id);
          
          localStorage.setItem("userId",res.id)
          
          navigate('/home');
        } else {
          console.log(res);
          alert(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={imageStyle}>
      <CssBaseline />
      <Grid container>
          <div style={{width:'30%',marginTop:"10%",marginLeft:"35%",minWidth:"500px"}}>

          <div style={{display:"flex",marginLeft:"10%"}}>
          <Button 
          onClick={(e) => {setIsSignUp(true)}} 
         
          type='submit'
          style={topButtontyle} 
           >Sign In</Button>
          <Button onClick={(e) => {setIsSignUp(false)}} style={topButtontyle2} >Sign Up</Button>
          </div>
          {isSignUp ? (<div style={containerStyle}>
            
            <div>
              <img style={{ width: '50%', marginLeft: '25%' }} src={MonoviLogo} alt="Logo" />
            </div>

            <form onSubmit={handleSubmit} style={formStyle}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={submitButtonStyle}
              >
                Sign In
              </Button>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Link style={{color:'black'}}>Forget Password</Link>
                
              </div>
            </form>
          </div>) : (<div><Register></Register></div>)}
          
          
          
          </div>
        </Grid>

    </div>
  );
};

export default Login;

