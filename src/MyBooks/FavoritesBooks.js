import { useState,useEffect } from "react";
import MiniNavbar from "./MiniNavbar";
import Book from "../Book/Book";

function FavoritesBooks(props){
    const [books,setBooks] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const {userId} = props;


    useEffect(()=>{
        
            fetch("http://fatihyelbogaa-001-site1.htempurl.com/favorites/"+userId)
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
    },[userId])
    console.log(books)

    return(

        <div>
            <MiniNavbar></MiniNavbar>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"baseline"}}>
            {books.map((book) =>(
                    <Book book={book.book}></Book>
            )

            )}
            
            
        </div>
        </div>
    )

}
export default FavoritesBooks;