import MiniNavbar from './MiniNavbar';
import React, { useState } from 'react';
import {
  Box, TextField, Typography, Grid,
  Button, createTheme, ThemeProvider,
  InputLabel, FormControl, Select, MenuItem, Avatar,
  Paper,
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

const AddBook = () => {
  const [bookInfo, setBookInfo] = useState({
    photo: '',
    name: '',
    pageNumber: '',
    writer: '',
    pdfFile: null,
    description: '',
    bookType: '',
    language: '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handlePdfFileChange = (event) => {
    const pdfFile = event.target.files[0];
    setBookInfo({ ...bookInfo, pdfFile });
  };

  const handleProfilePhoto = (e) => {
    setAvatar(e.target.value);
  };

  const handleAddBook = () => {
    // You can implement your logic to add the book here
    // For example, you can send the bookInfo object to an API or update your state.
    console.log('Book Added:', bookInfo);

    // Clear the input fields
    setBookInfo({
      photo: '',
      name: '',
      pageNumber: '',
      writer: '',
      pdfFile: null,
      description: '',
      bookType: '',
      language: '',
    });
  };

  return (
    <div>
      <MiniNavbar></MiniNavbar>
      <ThemeProvider theme={theme}>
        <Box sx={{ padding: 3, marginTop: 2, borderRadius: 2, width: '60%', marginLeft: '20%', marginRight: '20%' }}>
          <Typography variant="h6" component="p" sx={{ color: '#000', textAlign: 'center', textShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '32px' }}>Add a New Book</Typography>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginBottom: 3 }}>
                <input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  onChange={handleProfilePhoto}
                  style={{ display: "none" }}
                />
                <img style={{ width: 150, height: 150 }}></img>
                <Typography variant="h6" component="p" sx={{ color: '#000', textAlign: 'center', textShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '32px' }}>

                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 1, color: "white", backgroundColor: "#7D7D7D", fontWeight: "bold" }} onClick={() => document.getElementById('avatar-upload').click()}>Edit Photo</Button>
              </Box>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Book Name"
                  fullWidth
                  value={bookInfo.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="pageNumber"
                  label="Page Number"
                  fullWidth
                  value={bookInfo.pageNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="writer"
                  label="Writer"
                  fullWidth
                  value={bookInfo.writer}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="pdf-file">Upload PDF File</InputLabel>
                <input
                  accept="application/pdf"
                  id="pdf-file"
                  type="file"
                  onChange={handlePdfFileChange}
                  style={{ display: "block", marginTop: "8px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  value={bookInfo.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="bookType"
                  label="Book Type"
                  fullWidth
                  value={bookInfo.bookType}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="language-label">Language</InputLabel>
                  <Select
                    labelId="language-label"
                    id="language-select"
                    name="language"
                    value={bookInfo.language}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    {/* Add more language options here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddBook}
                  sx={{ width: "100%" }}
                >
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default AddBook;
