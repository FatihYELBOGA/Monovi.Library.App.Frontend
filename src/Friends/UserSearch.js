import React, { useEffect, useState } from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Link } from '@mui/material';
import Photo from '../OtherComponents/Photo';
import CircularProgress from '@mui/material/CircularProgress';
// Dummy user data (replace with actual user data or fetch from an API)


const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [users,setUsers] = useState([]);
  const [avatarUrl,setAvatarUrl] = useState("");
  const [isLoaded,setIsLoaded] = useState(false);

  useEffect(()=>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/users")
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
            console.log(result)
            
            setUsers(result)
            if(result.profil !=null ){
              setAvatarUrl(Photo(result.profil.content,result.profil.name))
             
            }
            setIsLoaded(true);
        },
        (error) => {
           
        }
    )

},[])

  const handleSearch = (query) => {
    // Simulate a search by filtering the users based on the query
    const results = users.filter((user) =>
      user.firstName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div style={{width:"50%"}}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        
        onChange={handleChange}
      />
      {searchQuery && ( // Check if there's a search query
         ((isLoaded) ? (
          <div>
          <List>        
          {searchResults.map((user) => (
            <Link
            component="a"
            href={`/user-details/${user.id}`} // Replace with your desired link URL
            underline="none"
            color="inherit"
          >
            <ListItem
              key={user.id}
              style={{ backgroundColor: 'white' }} // Add background color
            >
              <ListItemAvatar>
                <Avatar src={user.avatarUrl} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div>
                      {user.firstName}
                  </div>
                    
                 
                }
              />
            </ListItem>
            </Link>
          ))}
        </List></div>) : (
        <div>
            <CircularProgress />
        </div>))
        
      )}
    </div>
  );
};

export default UserSearch;
