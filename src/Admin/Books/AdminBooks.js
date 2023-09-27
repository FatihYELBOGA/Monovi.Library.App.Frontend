import Home from "../../Home/Home";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import RemoveIcon from '@mui/icons-material/Remove';
import AddBook from "../../MyBooks/AddBook";
function AdminBooks() {

    const [isAdd,setIsAdd] = useState(true);

  return (
    <div>
       
      <IconButton
        color="primary"
        aria-label="Add Author"
        onClick={()=>setIsAdd(!isAdd)}
        style={{
          position: "absolute",
          top: "180px",
          left: "10%",
          backgroundColor: "red",
          color: "#ffffff",
        }}
      >
        {(isAdd) ? (  <AddIcon />) : (<RemoveIcon/>)}
       
      </IconButton>
      {(isAdd) ? (
            <Home role="ADMIN" />
      ) : (
            <AddBook role="ADMIN"/>
      )}
      
      
    </div>
  );
}

export default AdminBooks;
