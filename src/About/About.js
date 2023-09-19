import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import backgroundImage from '../image/pexels-ricky-esquivel-1907785.jpg';

const aboutStyles = {
  header: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImage}')`,
    backgroundSize: 'cover',
    height: '400px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  aboutContent: {
    padding: '16px', // or any padding you prefer
    margin: '0 auto', // Center content horizontally
    backgroundColor: "#eeeeee", // Set a maximum width for content
    borderRadius: '8px',
    width: "50%",
    border: 0,
    boxShadow: 0,
   
  },
  paragraph: {
    marginBottom: '16px', // Add more margin between paragraphs
    fontSize: '16px', // Increase font size for readability
    lineHeight: '1.6', // Adjust line height for better spacing
  },
  strong: {
    fontWeight: 'bold', // Make strong text bold
  },
};

const About = () => {
  return (
    <div>
      {/* Header Photo */}
      <div style={aboutStyles.header}>
        <Typography variant="h3" component="div" gutterBottom>
          About Us
        </Typography>
      </div>

      <Paper elevation={0} style={aboutStyles.aboutContent}>
        {/* Content */}
        <p style={aboutStyles.paragraph}>
          Welcome to [Library Name], your one-stop destination for all things related to books and reading. We are thrilled to introduce you to our innovative library app, designed to enhance your reading experience and foster a sense of community among book enthusiasts.
        </p>

        <p style={aboutStyles.paragraph}>
          <span style={aboutStyles.strong}>Our Mission:</span> At [Library Name], our mission is to connect readers, promote the love of reading, and make accessing and sharing books as easy and enjoyable as possible. We believe in the power of books to inspire, educate, and entertain, and we are dedicated to providing you with the tools to explore the world of literature effortlessly.
        </p>

        <p style={aboutStyles.paragraph}>
          <span style={aboutStyles.strong}>Key Features:</span> Our library app offers several key features to enhance your reading journey:
        </p>
        <ul>
          <li style={aboutStyles.paragraph}>Book Exchange: Our library app offers a unique book exchange feature that allows you to lend and borrow books from fellow members. Share your favorite reads or discover new ones within our vibrant community.</li>
          <li style={aboutStyles.paragraph}>Add Books: Easily expand your virtual bookshelf by adding your own collection to the app. Keep track of your personal library and share your literary interests with friends.</li>
          <li style={aboutStyles.paragraph}>Read PDFs: In addition to physical books, our app supports PDF reading. Enjoy the convenience of reading digital books and documents from the comfort of your device.</li>
          <li style={aboutStyles.paragraph}>Make Friends: Connect with fellow book lovers, build your reading network, and engage in meaningful discussions about your favorite titles and authors.</li>
          <li style={aboutStyles.paragraph}>Explore Authors: Discover new authors and delve into their works. Our app provides comprehensive author profiles and recommendations based on your reading preferences.</li>
        </ul>

        <p style={aboutStyles.paragraph}>
          <span style={aboutStyles.strong}>Design Philosophy:</span> Our app's design is centered around simplicity, usability, and aesthetics. Here's a glimpse of what you can expect:
        </p>
        <ul>
          <li style={aboutStyles.paragraph}>Clean and Intuitive Interface: Our user-friendly interface ensures that you can navigate the app with ease. Find books, connect with friends, and access features effortlessly.</li>
          <li style={aboutStyles.paragraph}>Personalized Recommendations: Our recommendation engine uses advanced algorithms to suggest books and authors tailored to your reading history and preferences.</li>
          <li style={aboutStyles.paragraph}>Community Interaction: Engage with the reading community through forums, book clubs, and discussion groups. Share your thoughts and insights with fellow members.</li>
          <li style={aboutStyles.paragraph}>Beautiful Book Covers: We believe that a book's cover is a work of art in itself. Enjoy high-resolution book covers that bring your virtual library to life.</li>
        </ul>

        <p style={aboutStyles.paragraph}>
          Whether you're a voracious reader or just starting your reading journey, [Library Name] is the perfect companion. Join our community of book enthusiasts today and unlock a world of literary adventures. Together, let's explore the vast universe of books and share the joy of reading.
        </p>
        <p style={aboutStyles.paragraph}>
          Start your reading journey with [Library Name] now, and experience the magic of books like never before!
        </p>
      </Paper>
    </div>
  );
};

export default About;

