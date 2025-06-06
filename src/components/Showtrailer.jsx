import React, { useEffect, useState } from 'react'
import {fetchTrailer} from '../services/apiService.js';
// import '../assets/Showtrailer.css'

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const url= "https://api.themoviedb.org/3";

// const options = {
//     method:'GET',
//     headers:{
//       accept: 'application/json',
//       authorization: `Bearer ${API_KEY}`
//     }
// };


function Showtrailer({movieId, onClose}) {

  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

// const fetchTrailer = async() =>{
//   try{

//     const response = await fetch(`${url}/movie/${movieId}/videos?`, options);
    
//     const data = await response.json();
    
//     const trailer = data.results.find(
//       (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
//     );
    
//     setTrailerKey(trailer?.key);
//     setError(!trailer?.key ? 'No trailer available' : null);
//   }catch(error){
//     console.error('error fetching trailer', error);
//     setError('Failed to load trailer');
//   }finally{
//     setIsLoading(false);
//   }

// }// fetchTrailer closing

const loadTrailer = async () => {

  setIsLoading(true);
  setError(null);
  try {
    const trailer = await fetchTrailer(movieId);

    setTrailerKey(trailer.key);
    setError(!trailer?.key ? 'No Trailer available' : null);
    
  } catch (error) {
    console.error('error fetching trailer', error);
  }finally{
    setIsLoading(false);
  }

}// function closing
useEffect( () => {
  loadTrailer();

}, [movieId] );

  return (
   <>
    <div className='trailer-modal' onClick={onClose}>
      <div className="modal-content" onClick={(event)=>
        event.stopPropagation()}>

        <button className='close-button' onClick={onClose}
        aria-label='Close button'>
          &times;
        </button>
        
       {isLoading ? (
          <div className="loading-trailer">Loading trailer...</div>
        ): error ? (
          <div className="no-trailer">
            <p>{error}</p>
          </div>
        ): (
          <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title='Movie Trailer'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>


        )}
  
        </div>
    </div>
    
   </>
  )
}// component closing

export default Showtrailer