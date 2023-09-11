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
  marginTop: '12%', // Adjust this value as needed
  padding: '20px',
  marginLeft: "35%",
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Box shadow
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
  fontSize: "18px",
  fontWeight: "bold",
  height:'18%',
  margin: '24px 0 16px',
  backgroundColor: '#B00000',
};

const imageStyle = {
  backgroundImage: ' url(' + background + ')',
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://fatihyelbogaa-001-site1.htempurl.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id != null) {
          setUserId(res.userId);
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
        
        
          <div style={containerStyle}>
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
                <Link to="/sign-up" style={{ color: "black" }}>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </Grid>

    </div>
  );
};

export default Login;

