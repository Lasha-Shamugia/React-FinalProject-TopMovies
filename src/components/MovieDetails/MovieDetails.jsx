import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const API_KEY = "fec65e10acc150682ff8035e489f5a57";
const BASE_URL = "https://api.themoviedb.org/3/movie";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieResponse = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`);
      const movieData = await movieResponse.json();
      setMovie(movieData);

      const castResponse = await fetch(`${BASE_URL}/${id}/credits?api_key=${API_KEY}&language=en-US`);
      const castData = await castResponse.json();
      setCast(castData.cast.slice(0, 4));
    };
    
    fetchMovieData();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <button 
        className="btn btn-secondary mb-3" 
        onClick={() => navigate(location.state?.from || "/home")}
      >
        🔙 Go Back
      </button>
      <div className="row w-100">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid"
            alt={movie.title}
          />
        </div>
        <div className="col-md-6">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <h4>Top Billed Cast:</h4>
          <div className="row">
            {cast.map(actor => (
              <div key={actor.id} className="col-md-3 text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  className="img-fluid rounded"
                  alt={actor.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'; }}
                />
                <p><strong>{actor.name}</strong> as {actor.character}</p>
              </div>
            ))}
          </div>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

