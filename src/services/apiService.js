import React from "react";

const URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMovies = async (query = "", page = 1) => {
  const endpoint = query
    ? `${URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    throw new Error("failed to fetch movies");
  }
  const data = await response.json();
  return {
    results: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

//showTrailer
export const fetchTrailer = async (movieId) => {
  const endpoint = `${URL}/movie/${movieId}/videos`;

  const response = await fetch(endpoint, options);
  const data = await response.json();

  const trailer = data.results?.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  return trailer || null;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${URL}/movie/${movieId}`, options);

  const data = response.json();

  return data || null;
};
