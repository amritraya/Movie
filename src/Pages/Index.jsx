import React from 'react'
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Search } from '../components/Search';
import Spinner from '../components/Spinner';
import Moviecard from '../components/Moviecard';

import Pagination from '../components/Pagination'

import {fetchMovies} from '../services/apiService.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function Index() {
 const [search, setSearch] = useState('');
 const [errorMsg, setErrorMsg] = useState('');
 const [movieList, setmovieList] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
const [debounceSearch, setDebounceSearch] = useState('');

useDebounce ( () => {

  setDebounceSearch(search);
  setCurrentPage(1); //reset to page 1 when search changes
}
, 1000, [search]);



//  const fetchMovies = async (query, page = 1) => {
//     setIsLoading(true);
//     setErrorMsg('');
//     try{
//         const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`  : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

//        const response = await fetch(endpoint, options);
        
//         if (!response.ok) {
//               throw new Error('failed to fetch movies');  
//         }

        
//         const data = await response.json();
        
      
//          if(data.Response === 'false'){
//           setErrorMsg(data.Error || 'failed to fetch movies');
//           setmovieList([]);
//             return;
//          }
  
//          setmovieList(data.results || []);
//         // make sure to set totalPages from API reference
//         setTotalPages(data.total_pages ? Math.min(data.total_pages, 500): 1);        
//     }
//     catch(error){
//       console.error(`Error fetching movie: ${error}`);
//       setErrorMsg('Error fetching movies. Please try again later.');
//     } finally{
//       setIsLoading(false);
//     }
//  }

const loadMovies = async (query,page) =>{
  setIsLoading(true);
  setErrorMsg('');
  try{

    const {results, totalPages}= await fetchMovies(query, page);

    setmovieList(results);
    // console.log(results);

    setTotalPages(totalPages);

  }catch(error){
    console.error('fetching error', error);
  } finally{
    setIsLoading(false);
  }
}



 useEffect(() => {
      loadMovies(debounceSearch, currentPage);
 }, [debounceSearch, currentPage]);

  return (
   <main>
     <div className="pattern"/>
     
     <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

        <Search search={search} setSearch={setSearch}/>
      </header>

      <section className="all-movies">
        <h1 className='mt-[40px]'>Movies List</h1>

       // {errorMsg && <p className='text-red-500'>{errorMsg}</p>}

       {isLoading ? (

       <Spinner/>
 
       ): errorMsg ? (
        <p className='text-red-500'>{errorMsg}</p>
       ): (
        <ul>
        
          {movieList.map((movie) => (
            <Moviecard key={`${movie.id}-${currentPage}`} movie={movie} />
          ))}
        </ul>
       )
      }
       
      </section>

      <section>
       {totalPages > 1 &&(

         <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={(newPage)=>{
           console.log('changing to page', newPage);
           setCurrentPage(newPage);
         }}
         />
       )

       }
        
      </section>
            
     </div>
     </main>
  )
}

export default Index