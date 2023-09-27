import MiniNavbar from './MiniNavbar';
import React, { useEffect, useState } from 'react';
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

const AddBook = (props) => {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [bookType,setBookType] = useState("");
  const [pageNumber,setPageNumber] = useState(0);
  const [language,setLanguage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarUrl,setAvatarUrl] = useState(null);
  const [content,setContent] = useState("")
  const [contentUrl,setContentUrl] = useState("");
  const [writerId,setWriterId] = useState(0);
  const {userId,role} = props;


  //Enumaration lists
  const [languages,setLanguages] = useState([]);
  const [writers,setWriters] = useState([]);
  const [bookTypes,setBookTypes] = useState([]);

  useEffect(() =>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/enumerations/book-types")
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
            setBookTypes(result);
        },
        (error) => {
            console.log(error)   
        }
    )

  },[])

  useEffect(() =>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/enumerations/languages")
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
            setLanguages(result);
        },
        (error) => {
            console.log(error)   
        }
    )

  },[])
  useEffect(() =>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/writers/names")
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
            setWriters(result);
        },
        (error) => {
            console.log(error)   
        }
    )

  },[])
  
  

  const handlePdfFileChange = (event) => {
    const pdfFile = event.target.files[0];
    setContent(pdfFile);
  };

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

  const handleAddBook = () => {

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("BookType", bookType);
    formData.append("PageNumber", pageNumber);
    formData.append("Language", language);
    formData.append("Photo", avatar);
    formData.append("Content", content);
    formData.append("UserId",userId)
    formData.append("WriterId", writerId);

    fetch("http://fatihyelbogaa-001-site1.htempurl.com/books", {
      method: "POST",
      body: formData
    })
    .then((res) => res.json()) 
    .then((data) => {
      alert("the user informations added successfully!");
      console.log(data);
      setName("");
      setDescription("");
      setBookType("");
      setPageNumber(0);
      setLanguage("");
      setAvatar("");
      setAvatarUrl("");
      setContent("");
      setWriterId(0);
    })
    .catch((err) => console.log(err));
  };


  return (
    <div style={{ display: 'flex', paddingBottom: 0 }}>
      {(role === "ADMIN") ? (<div></div>) : ( <MiniNavbar />)}
   
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
        <Box sx={{ padding: 3, marginTop: 6, borderRadius: 2, width: '60%', marginLeft: '20%', marginRight: '20%',flex: '2' }}>

          <Paper sx={{ p: 3,padding:6,backgroundColor:"transparent",border:0,boxShadow:0 }}>
            <Grid container spacing={2}>
              <Box sx={{ width: "100%", 
                display: 'flex', 
                alignItems: 'center', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                marginBottom: 3,
                mt:5 }}>
                <input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  onChange={handleProfilePhoto}
                  style={{ display: "none" }}
                />
                <img style={{ width: 150, height: 150 }} src={avatarUrl}></img>
                <Typography variant="h6" 
                component="p" 
                sx={{ color: '#000', 
                textAlign: 'center', 
                textShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', 
                fontFamily: 'Poppins', 
                fontWeight: 300, 
                fontSize: '32px' }}>

                </Typography>
                <Button 
                variant="contained" 
                size="small" 
                sx={{ mt: 1,
                  width:150,
                 color: "white", 
                 backgroundColor: "#7D7D7D", 
                 fontWeight: "bold" }}
                 onClick={() => document.getElementById('avatar-upload').click()}>Edit Photo</Button>
              
              </Box>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Book Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="pageNumber"
                  label="Page Number"
                  fullWidth
                  value={pageNumber}
                  onChange={(e) => setPageNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel id="bookType-label">Writer</InputLabel>
                  <Select
                    labelId="writer-label"
                    id="writer-select"
                    
                    onChange={(e) => setWriterId(e.target.value)}
                  >
                    {writers.map((writer) =>(
                        <MenuItem key={writer.id} value={writer.id}>{writer.firstName+" "+writer.lastName}</MenuItem>
                    ))}
                  
                  </Select>
                </FormControl>
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
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="bookType-label">Book Type</InputLabel>
                  <Select
                    labelId="bookType-label"
                    id="bookType-select"
                    value={bookType}
                    onChange={(e) => setBookType(e.target.value)}
                  >
                    {bookTypes.map((types) =>(
                        <MenuItem key={types} value={types}>{types}</MenuItem>
                    ))}
                  
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="language-label">Language</InputLabel>
                  <Select
                    labelId="language-label"
                    id="language-select"
                    name="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((language) =>(
                        <MenuItem value={language}>{language}</MenuItem>
                    ))}
                  
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddBook}
                  sx={{ width: "100%",backgroundColor:"#7D7D7D",fontWeight: "bold" }}
                >
                  Add Book
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

export default AddBook;
