import { useState,useEffect } from "react";
import MiniNavbar from "./MiniNavbar";
import Book from "../Book/Book";

function MyBooks(props){
    const { userId} = props;
    const [books,setBooks] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        
            fetch("http://fatihyelbogaa-001-site1.htempurl.com/books/users/"+userId)
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
                    console.log(result)
                    setBooks(result);
                },
                (error) => {
                    setIsLoaded(true);   
                }
            )

    },[])

    return(
        <div style={{ display: 'flex', paddingBottom: 0 }}>
  <MiniNavbar />
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
    {books.map((book) => (
      <Book book={book} key={book.id} />
    ))}
  </div>
</div>
    )

}
export default MyBooks;