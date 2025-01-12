import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type, currentPage]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setTotalPages(data.total_pages); 
      });
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination__btn"
        >
          Previous
        </button>
        <span className="pagination__info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination__btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
