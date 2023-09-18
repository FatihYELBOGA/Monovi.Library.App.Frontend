import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333', // You can customize the background color
        color: 'white',
        py: 4, // Adjust the padding as needed
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Your Website Name</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">
              &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              <Link href="/privacy-policy" color="inherit" sx={{ mx: 2 }}>
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" color="inherit" sx={{ mx: 2 }}>
                Terms of Service
              </Link>
              <Link href="/contact-us" color="inherit" sx={{ mx: 2 }}>
                Contact Us
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
