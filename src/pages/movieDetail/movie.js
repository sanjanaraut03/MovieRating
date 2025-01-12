import React, { useEffect, useState, useRef } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [cast, setCast] = useState([]);  // State to store cast details
    const { id } = useParams();
    const detailRef = useRef(null);

    useEffect(() => {
        getMovieData();
        getCastData();
    }, [id]);

    useEffect(() => {
        if (currentMovieDetail && detailRef.current) {
            detailRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentMovieDetail]);

    // Fetch movie details
    const getMovieData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data));
    };

    // Fetch cast details
    const getCastData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setCast(data.cast));
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}
                    alt="Movie Backdrop"
                />
            </div>

            <div className="movie__detail" ref={detailRef}>
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
                            alt="Movie Poster"
                        />
                    </div>
                </div>

                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail?.original_title}</div>
                        <div className="movie__tagline">{currentMovieDetail?.tagline}</div>
                        <div className="movie__rating">
                            {currentMovieDetail?.vote_average} <i className="fas fa-star" />
                            <span className="movie__voteCount">({currentMovieDetail?.vote_count} votes)</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail?.runtime} mins</div>
                        <div className="movie__releaseDate">Release date: {currentMovieDetail?.release_date}</div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail?.overview}</div>
                    </div>
                </div>
            </div>

            <div className="movie__cast">
                <h2>Cast</h2>
                <div className="movie__castGrid">
                    {cast.length > 0 ? (
                        cast.slice(0, 10).map(actor => (
                            <div className="cast__item" key={actor.cast_id}>
                                <img
                                    className="cast__image"
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                            : "https://via.placeholder.com/200x300?text=No+Image"
                                    }
                                    alt={actor.name}
                                />
                                <div className="cast__name">{actor.name}</div>
                                <div className="cast__character">as {actor.character}</div>
                            </div>
                        ))
                    ) : (
                        <p>No cast information available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Movie;
