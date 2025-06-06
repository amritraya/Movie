import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/apiService";
import "../assets/MovieDetail.css";

function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  const fetchmovieDetail = async (id) => {
    const details = await fetchMovieDetails(id);
    setMovieDetail(details);
  };

  useEffect(() => {
    fetchmovieDetail(id);
  }, [id]);

  console.log(movieDetail);
  return (
    <>
      <div className="movie-details-modal">
        <div
          className="modal-content"
          onClick={(events) => events.stopPropagation()}
        >
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>

          {movieDetail && (
            <div className="details-content">
              <div className="details-header">
                <h2>
                  {movieDetail.title} (
                  {new Date(movieDetail.release_date).getFullYear()})
                </h2>
                <div className="rating">
                  <img src="../star.svg" alt="star" />
                  <p>{movieDetail.vote_average?.toFixed(1)}/10</p>
                </div>
              </div>

              <div className="details-body">
                <div className="poster">
                  <img
                    src={
                      movieDetail.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                        : "/placeholder-poster.jpg"
                    }
                    alt={movieDetail.title}
                  />
                </div>
                <div className="info">
                  <p className="overview">{movieDetail.overview}</p>
                  <div className="meta">
                    <p>
                      <strong>Runtime:</strong>
                      {movieDetail.runtime} minutes
                    </p>
                    <p>
                      <strong>Genres:</strong>
                      {movieDetail.genres?.map((g) => g.name).join(",")}
                    </p>
                    <p>
                      <strong>Release Date:</strong> {movieDetail.release_date}
                    </p>
                  </div>
                  {movieDetail.production_companies &&
                    movieDetail.production_companies.length > 0 && (
                      <div className="production-companies">
                        <div className="companies-grid">
                          <div className="company">
                            <p>
                              <strong>Production Company:</strong>
                              {movieDetail.production_companies[0].name}
                            </p>

                            <p className="country">
                              <strong>Origin Country:</strong>
                              {
                                movieDetail.production_companies[0]
                                  .origin_country
                              }
                            </p>
                          </div>

                          {/* {movieDetail?.production_companies.map((prod_com) => (
                            <div key={prod_com.id} className="cast-member">
                              <p>{prod_com.name.slice(0, 1)}</p>
                              <p className="character">
                                {prod_com.origin_country}
                              </p>
                            </div> */}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>

    // <div className="text-red-900">
    //     {movieDetail && (
    //       <div>
    //         <img
    //           src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
    //           alt=""
    //         />
    //         <p>MovieDetail</p>
    //         <p>{movieDetail.title}</p>
    //         <p>overview</p>
    //         <p>{movieDetail.overview}</p>
    //         <p>
    //           genere
    //           {movieDetail?.genres.map((item) => {
    //             return <p key={item.id}>{item.name} </p>;
    //           })}
    //         </p>
    //       </div>
    //     )}
    //   </div>
  );
}

export default MovieDetail;
