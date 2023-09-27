import React from "react";
import Book from "../Book/Book";
import { useState,useEffect } from "react";
import UserSearch from "./UserSearch";
import FriendsNavbar from "./FriendsNavbar";
import Friend from "./Friend";

function FriendRequests (props){
    const {userId} = props;
    const [friends,setFriends] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const itemsPerPage = 3; // Number of authors to display per page
   
  
  
    useEffect(() => {
      fetch(`http://fatihyelbogaa-001-site1.htempurl.com/friends/waiting/${userId}?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
        .then((res) => {
          if (res.status === 204) {
            return Promise.resolve([]);
          } else {
            return res.json();
          }
        })
        .then(
          (result) => {
            setIsLoaded(true);
            setFriends(result.content);
            setTotalPage(result.totalPages);
            setFilteredFriends(result.content); // Initialize filteredAuthors with all authors
          },
          (error) => {
            setIsLoaded(true);
          }
        );
    }, [currentPage]);

    

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };



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
    {filteredFriends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
    
    
    <div style={{ textAlign: 'center', marginTop: 20 }}>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? 'active' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
  </div>
</div>
    )

}
export default FriendRequests;