import React from 'react'
import {useState, useEffect} from 'react';

const Moviedetails= () => {
const [movieDetails, setMovieDetails] = useState(null);
const [isLoading, setisLoading] = useState(true);
const [error, seterror] = useState(null);


const loadMovieDetails = () => {

}// laodmovieDetails closing

useEffect( () => {
  loadMovieDetails();
}, [movieId]);
  return (
    <>



    </>
  )
}// component closing

export default Moviedetails