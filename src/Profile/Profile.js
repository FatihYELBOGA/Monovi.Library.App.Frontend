import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Avatar, Typography, Grid,
  Select, MenuItem, InputLabel, FormControl, Button, createTheme, ThemeProvider
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2150eb',
    },
    secondary: {
      main: '#ffffff',
    }
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "none"
          },
          "&.Mui-focused:after": {
            borderBottom: "none"
          }
        },
        root: {
          "&:hover": {

            backgroundColor: "transparent"
          },
          "&:focus": {
            backgroundColor: "transparent"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused fieldset": {
            borderColor: "transparent"
          }
        }
      }
    }
  }
});

const Profile = (props) => 
{
  // username, phone, firstName, lastName, birthDate, gender, and locationnformations
  const [username, setUsername] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [about,setAbout] = useState("");
  const {userId} = props;


  // byte array of profile photo
  const [avatar, setAvatar] = useState(null);

  // profile photo
  const [avatarURL, setAvatarURL] = useState(null);

  // get the user informations by userId
  useEffect(() => 
  { 
    console.log(userId);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/users/"+userId).
    then((res) =>
      res.json()).
    then((result) => {
      
      setUsername(result.email);
      setFirstName(result.firstName);
      setLastName(result.lastName);
      setGender(result.gender);
      setBirthDate(result.bornDate.split('T')[0]);
     
      if(result.profile!=null){
        convertBase64ToFile(result.profile.content, result.profile.name);
      }
    },
    (error) => {
      console.log(error);
    });
  }, []);

 
  
 

  
  // convert the byte[] to file object
  const convertBase64ToFile = (base64String, fileName) => 
  {
    const contentType = 'image/*'; // Update the content type as per your file type
    const sliceSize = 1024;
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    const f = new File([blob], fileName, { type: contentType });
    const fileURL = URL.createObjectURL(f);
    setAvatar(f);
    setAvatarURL(fileURL);
  };

  // select the image for the profile photo
  const handleFile = (e) => 
  {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size <= fileSizeLimit) {
        const fileURL = URL.createObjectURL(selectedFile);
        setAvatar(selectedFile);
        setAvatarURL(fileURL);
      } else {
        // File size exceeds the limit
        alert("File size exceeds the limit of 5MB.");
      }
    }
  }

  // update the user informations
  const handleSaveChanges = () => 
  {
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Gender", gender);
    formData.append("BornDate", birthDate);
    formData.append("Profil", avatar);
    formData.append("About",about)

    fetch("http://fatihyelbogaa-001-site1.htempurl.com/users/" + userId, {
      method: "PUT",
      body: formData
    })
    .then((res) => res.json()) 
    .then((data) => {
      alert("the user informations updated successfully!");
      console.log(data);
    })
    .catch((err) => console.log(err));
  };

  // the profile page
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, marginTop: 2, borderRadius: 2, width: '60%', marginLeft: '20%', marginRight: '20%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginBottom: 3 }}>
          <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          <Avatar sx={{ width: 80, height: 80}}src={avatarURL} />
          <Typography variant="h6" component="p" sx={{ color: '#000', textAlign: 'center', textShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '32px' }}>{firstName + " " + lastName}</Typography>
          <Button variant="contained"  size="small" sx={{ mt: 1,color:"white",backgroundColor:"blue" }} onClick={() => document.getElementById('avatar-upload').click()}>Edit Photo</Button>
       </Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <TextField label="E-mail"  value={username} onChange={(e) => setUsername(e.target.value)} fullWidth/>
          </Grid>
          
          <Grid item xs={6}>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Birth Date" type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>  
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" id="gender-select" value={gender} onChange={(e) => setGender(e.target.value)}>
             
                    <MenuItem value="MALE" >MALE</MenuItem>
                    <MenuItem value="FEMALE" >FEMALE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
          <Button sx={{ width: '50%', padding:'1%', marginRight:'25%',color:"white",backgroundColor:"blue" }} variant="contained"  onClick={handleSaveChanges}>Save Changes</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;