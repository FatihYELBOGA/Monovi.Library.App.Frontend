import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Typography, Grid,
  Button, createTheme, ThemeProvider,
  InputLabel, FormControl, Select, MenuItem, Avatar,
  Paper, TextareaAutosize,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2150eb',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  components: {
    // Your theme overrides here
  },
});

const AdminAddAuthor = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [biography, setBiography] = useState("");
  const [genders,setGenders] = useState([]);
  const [nationalities,setNationalities] = useState([]);
  

  const handleProfilePhoto = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Check file size
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size <= fileSizeLimit) {
        const fileURL = URL.createObjectURL(selectedFile);
        setAvatar(selectedFile);
        setAvatarUrl(fileURL);
      } else {
        // File size exceeds the limit
        alert("File size exceeds the limit of 5MB.");
      }
    }
  };

  useEffect(() =>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/enumerations/genders")
    .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
    .then(
        (result) => {
            setGenders(result);
        },
        (error) => {
            console.log(error)   
        }
    )

  },[])

  useEffect(() =>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/enumerations/nationalities")
    .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
    .then(
        (result) => {
            setNationalities(result);
        },
        (error) => {
            console.log(error)   
        }
    )

  },[])

  const handleAddAuthor = () => {
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Profil", avatar);
    formData.append("Gender", gender);
    formData.append("Nationality", nationality);
    formData.append("Biography", biography);
    console.log(avatar);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/writers", {
      method: "POST",
      body: formData
    })
    .then((res) => res.json()) 
    .then((data) => {
      alert("the user informations added successfully!");
      console.log(data);
      setFirstName("");
      setLastName("");
      setAvatar("");
      setGender("");
      setNationality("");
      setBiography("");
      setAvatarUrl(null);
      
    })
    .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: 'flex', paddingBottom: 0 }}>
      {/* Include any navigation component you have */}
      <div style={{ /* Your navigation styles */ }}>
        {/* Navigation content */}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          paddingTop: 50,
          paddingBottom: 70,
          marginLeft: '0%',
          flex: '2', // Make this part of the layout grow to occupy available space
        }}
      >
        <ThemeProvider theme={theme}>
          <Box sx={{ padding: 3, marginTop: 6, borderRadius: 2, width: '60%', marginLeft: '20%', marginRight: '20%', flex: '2' }}>
            <Paper sx={{ p: 3, padding: 6, backgroundColor: "transparent", border: 0, boxShadow: 0 }}>
              <Grid container spacing={2}>
                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginBottom: 3,
                  mt: 5
                }}>
                  <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    onChange={handleProfilePhoto}
                    style={{ display: "none" }}
                  />
                  <img style={{ width: 150, height: 150 }} src={avatarUrl} alt="Author Avatar" />
                  <Typography variant="h6"
                    component="p"
                    sx={{ color: '#000', textAlign: 'center', textShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '32px' }}>
                    Author Information
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, width: 150, color: "white", backgroundColor: "#7D7D7D", fontWeight: "bold" }}
                    onClick={() => document.getElementById('avatar-upload').click()}>Edit Photo</Button>
                </Box>
                <Grid item xs={6}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender-select"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >

                    {genders.map((gender) =>(
                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                    ))}
                  
                    </Select>
                  </FormControl>
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
                    <InputLabel id="nationality-label">Nationality</InputLabel>
                    <Select
                      labelId="nationality-label"
                      id="nationality-select"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    >
                      {nationalities.map((nationality) =>(
                        <MenuItem key={nationality} value={nationality}>{nationality}</MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="biography"
                    label="Biography"
                    multiline
                    rows={4}
                    fullWidth
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddAuthor}
                    sx={{ width: "100%", backgroundColor: "#7D7D7D", fontWeight: "bold" }}
                  >
                    Add Author
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AdminAddAuthor;


// Layout structure


