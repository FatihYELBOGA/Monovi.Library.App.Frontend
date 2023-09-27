import React, { useState } from "react";
import Authors from "../../Authors/Authors";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import RemoveIcon from '@mui/icons-material/Remove';
import AdminAddAuthor from "./AdminAddAuthor";
function AdminAuthors() {

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
            <Authors role="ADMIN" />
      ) : (
            <AdminAddAuthor/>
      )}
      
      
    </div>
  );
}

export default AdminAuthors;
