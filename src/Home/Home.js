import React from "react";
import Book from "../Book/Book";
import { useState,useEffect } from "react";

function Home (){
    const [books,setBooks] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        fetch("http://fatihyelbogaa-001-site1.htempurl.com/books")
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
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"baseline"}}>
            {books.map((book) =>(
                    <Book book={book}></Book>
            )

            )}
            
            
        </div>
    )

}
export default Home;