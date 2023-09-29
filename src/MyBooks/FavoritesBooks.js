import { useState,useEffect } from "react";
import MiniNavbar from "./MiniNavbar";
import Book from "../Book/Book";

function FavoritesBooks(props){
    const [books,setBooks] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const {userId} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const itemsPerPage = 3; // Number of authors to display per page
   
  
  
    useEffect(() => {
      fetch(`http://fatihyelbogaa-001-site1.htempurl.com/favorites/${userId}?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
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
            setBooks(result.content);
            setTotalPage(result.totalPages);
            // Initialize filteredAuthors with all authors
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

      <div style={{ display: 'flex' }}>
      <MiniNavbar />
      <div
        style={{
          flex: '2', // Take up remaining space
          padding: '20px', // Add some spacing
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          {books.map((book) => (
            <Book book={book.book} key={book.id} />
          ))}
        </div>
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
export default FavoritesBooks;