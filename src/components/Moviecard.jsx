import { useState, useCallback } from "react";
import "../assets/Moviecard.css";
import Showtrailer from "./Showtrailer";
import { Link } from "react-router-dom";

const Moviecard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      <div className="movie-card">
        <div className="poster-container" onClick={() => setShowTrailer(true)}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-poster.jpg"
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
          <Link to={`/movie/${movie.id}`}>
            <h3>{movie.title}</h3>
          </Link>
          <p>{movie.release_date?.split("-")[0]}</p>
          <div className="rating">{movie.vote_average?.toFixed(1)}</div>
        </div>
      </div>

      {showTrailer && (
        <Showtrailer
          movieId={movie.id}
          onClose={() => {
            setShowTrailer(false);
          }}
        />
      )}
    </>
  );
}; //Components closing

export default Moviecard;
