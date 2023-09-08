import React, { useState } from 'react';
import {

  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Grid,
} from '@mui/material';
import MonoviLogo from '../image/monovi-logo.png';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import background from '../image/pexels-ricky-esquivel-1907785.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30%',
  marginLeft: "25%"
};

const avatarStyle = {
  margin: '8px',
  backgroundColor: 'secondary',
};

const formStyle = {
  width: '100%',
  marginTop: '8px',
};

const submitButtonStyle = {
  margin: '24px 0 16px',
  backgroundColor:"#B00000"
};

const imageStyle = {
    backgroundImage: `url(${background})`, // Use forward slashes instead of backslashes
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    height: '100vh', // Adjust the height as needed
    width: "100%",
    
  };
  

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUserId} = props;
  const {navigate} = useNavigate;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {

        e.preventDefault();
        fetch("http://fatihyelbogaa-001-site1.htempurl.com/auth/login",
        {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body : JSON.stringify({
            email : email,
            password : password,
          }),    
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.id != null){
            setUserId(res.userId);
           
              navigate("/home");
                  
          } else {
            console.log(res);
            alert(res.message);
          }
        })
        .catch((err) => console.log(err))
      };
  

  return (
    <div style={{backgroundColor:"#FFABAB"}}>
        <div  maxWidth="100%" sx={{marginLeft:0,padding:0}}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={5} style={imageStyle} sx={{}}></Grid>
        <Grid item xs={6}>
          <div style={containerStyle}>
            <div>
            <img style={{width:"50%",marginLeft:"25%"}} src={MonoviLogo}></img>
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
              <div style={{display:"flex",justifyContent:"space-between",width:"100%"}} >
              <Link style={{textDecoration:"none"}}>Forget Password</Link>
              <Link to="/sign-up" style={{textDecoration:"none"}}>Create New Account</Link>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>

    </div>
    
  );
};

export default Login;

