import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Search } from "./components/Search";
import Spinner from "./components/Spinner";
import Moviecard from "./components/Moviecard";

import Pagination from "./components/Pagination";

import { fetchMovies } from "./services/apiService.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./Pages/MovieDetail.jsx";
import Index from "./Pages/Index.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
