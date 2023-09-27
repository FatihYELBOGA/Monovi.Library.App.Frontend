import React, { useState } from 'react';
import {
  TextField,
  Button,
  CssBaseline,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  
  padding: '35px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.80)', // Semi-transparent white background
  boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)', // Box shadow
};



const paperStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxShadow: "0px",
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
};

const formStyle = {
  width: '100%',
  marginTop: '16px',
};
const styles = theme => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important"
  }
});

const submitButtonStyle = {
  marginTop: '24px',
  fontSize: "18px",
  height: "30%",
  backgroundColor: '#B00000',
  fontWeight: "bold",
  color: 'white',
  '&:hover': {
    backgroundColor: '#135CAE',
  },
  '&:active': {
    backgroundColor: '#B00000', // Dark red color when clicked
  },
};

const textFieldStyle = {
  
  '& input:focus': {
    borderColor: '#B00000 !important', // Dark red border when focused
  },
};



const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain,setPasswordAgain] = useState('');
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
  const handlePasswordAgainChange = (e) =>{
    setPasswordAgain(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === passwordAgain){
    const formData = new FormData();
    formData.append("Email",email);
    formData.append("Password",password);
    formData.append("FirstName",firstName);
    formData.append("LastName",lastName);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/auth/register",
        {
          method: "POST",
          body : formData
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.id !== null){
              
              navigate("/");
              alert("Register completed !");
              setFirstName("");
              setEmail("");
              setPassword("");
              setPasswordAgain("");
          } else {
            console.log(res);
            alert("Register not completed !");
          }
        })
        .catch((err) => 
        console.log(err))
      }else{
        alert("Passwords are not same")
      }
    
  };

  return (
    <div style={{width: "100%"}}>
      <CssBaseline />
     
        <div elevation={3}style={containerStyle}>
          
        
          <form onSubmit={handleSubmit} style={formStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  sx={{}}
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
                  required
                  autoFocus
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
                  required
                  autoFocus
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
                  required
                  autoFocus
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  inputProps={{ style: textFieldStyle }}
                  onChange={handlePasswordChange}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                 
                  fullWidth
                  required
                  name="password-again"
                  label="Password (again)"
                  type="password"
                  id="password-again"
                  autoComplete="again-password"
                  autoFocus
                  value={passwordAgain}
                  onChange={handlePasswordAgainChange}
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
        </div>
      </div>
  
  );
};

export default Register;

