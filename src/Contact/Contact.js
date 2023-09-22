// src/ContactPage.js
import React, { useState,useEffect } from 'react';
import { Container, Typography, Button, Grid, TextField, Box, Paper, Avatar } from '@mui/material';
import './Contact.css';
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import the FontAwesome icons from react-icons
import Fatih from "../image/355996369_991319245559147_170078936704767630_n.jpg"
import Osman from "../image/371110078_836095094827149_4713213867691069774_n.jpg"

const SERVICE_ID = "service_etavgj2";
const TEMPLATE_ID = "template_ujpzmsc";
const USER_ID = "ejyUgQxzycyXjkYDQ";


const Contact = () => {
    useEffect(() => emailjs.init(USER_ID), []);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
          
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
             name: name,
              email: email,
              message:message,
            });
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
             setName("");
             setEmail("");
             setMessage("");
          } catch (error) {
            console.log(error);
          } finally {
           
          }
      };


  return (
    <Container className="container">
      <Paper elevation={3} className="paper">
        <Typography variant="h4" gutterBottom className="title">
          Contact Us
        </Typography>
        <Typography variant="body1" className="description">
          If you have any questions or feedback, please feel free to get in touch with us.
        </Typography>

        {/* Contact Form */}
        <form onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Name"
                onChange={(e) => {setName(e.target.value)}}
                fullWidth
                required
                value={name}
                variant="outlined"
                className="input"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Email"
                onChange={(e) => {setEmail(e.target.value)}}
                fullWidth
                required
                value={email}
                variant="outlined"
                className="input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                multiline
                onChange={(e) => {setMessage(e.target.value)}}
                rows={4}
                fullWidth
                required
                value={message}
                variant="outlined"
                className="input"
              />
            </Grid>
            <Grid item xs={12}>
              <button   
                
                type="submit"
                className="submit-button"
                
              >
                Send Message
              </button>
            </Grid>
          </Grid>
        </form>

        {/* Additional Contact Information */}
        <div className="contact-info">
          <Typography variant="h6" gutterBottom className="info-title">
            Additional Contact Information
          </Typography>
          <Typography variant="body1" className="info-description">
            Feel free to reach out to us through the following channels:
          </Typography>
          <ul className="info-list">
            <li>
              Email: <a href="mailto:contact@example.com" className="info-link">contact@example.com</a>
            </li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 1234 Main Street, City, Country</li>
          </ul>
          <div className="social-media">
        <a href="https://twitter.com/monoviteknoloji?lang=fi" className="social-link">
          <FaTwitter /> 
        </a>
        <a href="https://www.instagram.com/monoviteknoloji/" className="social-link">
          <FaInstagram /> 
        </a>
        <a href="https://tr.linkedin.com/company/monovi" className="social-link">
          <FaLinkedin /> 
        </a>
        <a href="mailto:osmanaltunay5@gmail.com" className="social-link">
          <FaEnvelope />
        </a>
      </div>

        </div>
      </Paper>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>
        <Avatar sx={{width:200,height:200,marginRight:20,marginLeft:20}} src={Fatih}></Avatar>
        <Typography sx={{mt:2,justifyContent:"center",display:"flex",fontWeight:"bold"}}>
        <a href="https://instagram.com/fatihyelbogaaa?igshid=MzRlODBiNWFlZA==" className="social-link">
        Fatih YELBOĞA
        </a>
          </Typography>
          <Typography color="text.secondary" sx={{mt:0,justifyContent:"center",display:"flex",marginBottom:10}}>
          Full-Stack Developer
          </Typography>
        
        
        </div>
        <div>
        <Avatar sx={{width:200,height:200,marginRight:20,marginLeft:20}} src={Osman}></Avatar>
        <Typography sx={{mt:2,justifyContent:"center",display:"flex",fontWeight:"bold"}}>
        <a href="https://instagram.com/altunayosman1?igshid=OGQ5ZDc2ODk2ZA==" className="social-link">
        Osman ALTUNAY
        </a>
          
          </Typography>
        <Typography color="text.secondary" sx={{mt:0,justifyContent:"center",display:"flex",marginBottom:10}}>
          Full-Stack Developer
          </Typography>
        </div>
        

      </div>
      
    </Container>
  );
};

export default Contact;
