import React, { useState, useEffect } from "react";
import UserSearch from "./UserSearch";
import FriendsNavbar from "./FriendsNavbar";
import { Typography } from "@mui/material";
import backgroundImage from "../image/desktop-wallpaper-best-friend-boy-and-girl-half-for-4-cave-wall-art-2-3-black-pinterest-boys-friends.jpg";

function AddNewFriends(props) {

  const aboutStyles = {
    header: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImage}')`,
      backgroundSize: 'cover',
      height: '400px',
      width: "100%",
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
  };

  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Friend Sidebar */}
      <div style={{ width: '15%', background: '#f0f0f0' }}>
        {/* Place your Friend Sidebar content here */}
        <FriendsNavbar />
      </div>

      {/* Main Content */}
      <div style={{ flex: '1' }}>
        {/* Image Section */}
        <div style={aboutStyles.header}>
          <Typography variant="h3" component="div" gutterBottom>
            Find New Friends
          </Typography>
        </div>

        {/* Content Section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"50px",marginLeft:"30%" }}>
          <div style={{  width: '100%', }}>
            {/* UserSearch */}
            <UserSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewFriends;
