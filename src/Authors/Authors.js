import React from "react";
import Book from "../Book/Book";
import { useState,useEffect } from "react";
import Author from "./Author";

function Authors (){
    const [authors,setAuthors] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        fetch("http://fatihyelbogaa-001-site1.htempurl.com/writers")
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
                setAuthors(result);
            },
            (error) => {
                setIsLoaded(true);   
            }
        )

    },[])
    return(
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"baseline"}}>
            
            {authors.map((author) =>(
                <Author author={author}></Author>
                )

            )}
            
        </div>
    )

}
export default Authors;
