import React from "react";
import Book from "../Book/Book";
import { useState,useEffect } from "react";
import UserSearch from "./UserSearch";
import FriendsNavbar from "./FriendsNavbar";

function FriendRequests (props){
    const {userId} = props;
    const [friends,setFriends] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        fetch("http://fatihyelbogaa-001-site1.htempurl.com/friends/"+userId)
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
                setIsLoaded(true);
                setFriends(result);
            },
            (error) => {
                setIsLoaded(true);   
            }
        )

    },[userId])


    return(
        <div style={{ display: 'flex', paddingBottom: 0 }}>
  <FriendsNavbar />
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'baseline',
      paddingTop: 150,
      marginLeft: '0%',
      flex: '2', // Make this part of the layout grow to occupy available space
    }}
  >
    <UserSearch></UserSearch>
   
  </div>
</div>
    )

}
export default FriendRequests;