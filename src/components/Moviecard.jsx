import { useState, useCallback } from 'react';
import './Moviecard.css';
import Showtrailer from './Showtrailer';


const Moviecard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  // const fetchTrailer = useCallback (async () => {
  //   setLoadingTrailer(true); // Updated to use setLoadingTrailer
  //   try {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           accept: 'application/json',
  //           authorization: `Bearer ${API_KEY}`
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     const trailer = data.results.find(
  //       (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  //     );
  //     setTrailerKey(trailer?.key);
  //   } catch (error) {
  //     console.error('Error fetching trailer:', error);
  //   } finally {
  //     setLoadingTrailer(false); // Updated to use setLoadingTrailer
  //   }
  // }, [movie.id]
  // );



  return (
    <>
      <div className="movie-card">
      <div className="poster-container" onClick={()=>
      setShowTrailer(true)}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder-poster.jpg'
          }
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="play-overlay">
          <svg className="play-icon" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
        <div className="rating">{movie.vote_average?.toFixed(1)}</div>
      </div>
      </div>

      {showTrailer && (
        <Showtrailer
          movieId={movie.id}
          onClose={()=> {setShowTrailer(false)}}
        />
      )}

</>
  
);
} //Components closing


export default Moviecard;