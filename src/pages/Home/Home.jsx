import React, { useState, useEffect } from "react";
import { fetchAllMovies } from "../../api/api";
import "../../App.css";
import { useAuthContext } from "../../context/AuthContextProvider"; // Importamos el contexto de autenticación
import { useNavigate, useLocation } from "react-router-dom";
import AuthMessage from "../../components/AuthMessage/AuthMessage";

const Home = ({ cart = [], setCart }) => {  
  const { state } = useAuthContext(); 
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 18;

  useEffect(() => {
    fetchAllMovies()
      .then((data) => setMovies(data)) // Obtener exactamente 216 películas únicas
      .catch((err) => console.error(err));
  }, []);

  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    return (
      <div className="rating-container">
        <span className="rating-number">{rating.toFixed(1)} / 10</span>
        <div className="star-rating static">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < fullStars ? "filled" : ""} ${index === fullStars && hasHalfStar ? "half" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (!state.isAuthenticated) {
    return <AuthMessage />;
  }

  // Paginación
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className="movies-container">
      <div className="movies-grid">
        {currentMovies.map((movie) => {
          const isInCart = cart.some((m) => m.id === movie.id);
          return (
            <div key={movie.id} className="card movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                {getStarRating(movie.vote_average)}
                <div className="card-buttons">
                  <button 
                    className="btn btn-info" 
                    onClick={() => setCart([...cart, movie])}
                    disabled={isInCart}
                  >
                    {isInCart ? "Selected" : "Rent"}
                  </button>
                  <button 
                         className="btn btn-primary"
                         onClick={() => navigate(`/details/${movie.id}`, { 
                        state: { from: `${location.pathname}?page=${currentPage}` } 
                       })}
                      >
                     Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Controles de paginación */}
      <div className="pagination-container">
        <button 
          className="btn btn-secondary btn-lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
         Previous
        </button>
        <span className="page-number btn-lg"> Page {currentPage} of {totalPages} </span>
        <button 
          className="btn btn-secondary btn-lg"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
