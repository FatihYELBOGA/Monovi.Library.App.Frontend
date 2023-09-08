import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
  CssBaseline,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: '100%',
  marginTop: "5%",
};

const avatarStyle = {
  margin: 'auto',
  backgroundColor: '#1976D2',
};

const paperStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
};

const formStyle = {
  width: '100%',
  marginTop: '16px',
};

const submitButtonStyle = {
  marginTop: '16px',
  backgroundColor: '#1976D2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#135CAE',
  },
};

const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUserId} = props;
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/auth/register",
        {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body : JSON.stringify({
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName,
          }),    
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.id != null){
            setUserId(0);
              navigate("/");
              alert("Register completed !");
          } else {
            console.log(res);
            alert("Register not completed !");
          }
        })
        .catch((err) => console.log(err))
    
  };

  return (
    <div style={{width: "100%"}}>
      <CssBaseline />
      <div style={containerStyle}>
        <Paper elevation={3} style={paperStyle}>
          <Avatar style={avatarStyle}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={handleSubmit} style={formStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoFocus
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={submitButtonStyle}
            >
              Register
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Register;

