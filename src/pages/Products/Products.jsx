import React, { useState, useEffect } from "react";
import { fetchAllMovies } from "../../api/api";
import "../../App.css";
import { useAuthContext } from "../../context/AuthContextProvider";
import AuthMessage from "../../components/AuthMessage/AuthMessage";

const API_KEY = "fec65e10acc150682ff8035e489f5a57";
const BASE_URL = "https://api.themoviedb.org/3/movie";

  const Products = () => {
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState({});
  const [hoverRatings, setHoverRatings] = useState({});
  const [trailerUrls, setTrailerUrls] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");
  const { state } = useAuthContext();

  useEffect(() => {
    fetchAllMovies()
      .then((data) => {
        const highRatedMovies = data.filter(movie => movie.vote_average >= 8);
        setMovies(highRatedMovies);
        fetchTrailers(highRatedMovies);
      })
      .catch((err) => console.error(err));
  }, []);

  // Obtener tráilers para todas las películas
  const fetchTrailers = async (movies) => {
    let trailerData = {};
    for (const movie of movies) {
      try {
        const response = await fetch(`${BASE_URL}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        trailerData[movie.id] = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
      } catch (error) {
        console.error("Error fetching trailer:", error);
        trailerData[movie.id] = null;
      }
    }
    setTrailerUrls(trailerData);
  };

  if (!state.isAuthenticated) {
    return <AuthMessage />;
  }

  return (
    <div className="container text-center">
      <div className="row justify-content-center mt-4">
        {movies.length === 0 ? (
          <p className="text-muted">No movies found with rating 8.0 or higher.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="col mb-4">
              <div className="card text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title text-white">{movie.title}</h5>
                  
                  {/* Progress Bar de Bootstrap */}
                  <div className="progress" style={{ height: "20px" }}>
                    <div 
                      className="progress-bar progress-bar-striped bg-warning" 
                      role="progressbar" 
                      style={{ width: `${(movie.vote_average / 10) * 100}%` }}
                      aria-valuenow={movie.vote_average}
                      aria-valuemin="0"
                      aria-valuemax="10"
                    >
                      {movie.vote_average.toFixed(1)} / 10
                    </div>
                  </div>
                  
                  {/* Mecanismo de puntuación con estrellas */}
                  <div className="mt-2">
                    {ratings[movie.id] ? (
                      <p className="text-warning mt-2">You rated: {ratings[movie.id]}/5</p>
                    ) : (
                      <p className="text-white">Rate Movie with Stars</p>
                    )}
                    <div className="d-flex justify-content-center">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <span
                            key={starValue}
                            className={`fs-4 mx-1 ${starValue <= (hoverRatings[movie.id] || ratings[movie.id] || 0) ? "text-warning" : "text-secondary"}`}
                            onClick={() => setRatings((prev) => ({ ...prev, [movie.id]: starValue }))}
                            onMouseEnter={() => setHoverRatings((prev) => ({ ...prev, [movie.id]: starValue }))}
                            onMouseLeave={() => setHoverRatings((prev) => ({ ...prev, [movie.id]: 0 }))}
                            style={{ cursor: "pointer", transition: "color 0.3s ease-in-out" }}
                          >
                            ★
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Botón para ver el tráiler */}
                  <button 
                    className="btn btn-outline-info mt-3" 
                    onClick={() => {
                      setCurrentTrailer(trailerUrls[movie.id]);
                      setShowModal(true);
                    }} 
                    disabled={!trailerUrls[movie.id]}
                  >
                    🎬 Play Trailer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Modal para mostrar el tráiler */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
            {currentTrailer ? (
              <iframe
                width="100%"
                height="400"
                src={currentTrailer}
                title="YouTube trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No trailer available for this movie.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;





