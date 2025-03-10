import React, { useState } from "react";

const API_KEY = "fec65e10acc150682ff8035e489f5a57";
const BASE_URL = "https://api.themoviedb.org/3/movie";

const Cart = ({ cart = [], setCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((movie) => movie.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Obtener el tráiler desde TMDB
  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setCurrentTrailer(`https://www.youtube.com/embed/${trailer.key}`);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 container text-center">
        <h2 className="col-md-12 mb-4 mt-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <h5>Your cart is empty, please select some movies!</h5>
        ) : (
          <div className="row justify-content-center">
            {cart.map((movie) => (
              <div key={movie.id} className="col-md-3 mb-4">
                <div className="card text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <div className="d-grid gap-2 mt-2">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => removeFromCart(movie.id)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-outline-info w-100"
                        onClick={() => fetchTrailer(movie.id)}
                      >
                        🎬 Play Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para mostrar el tráiler */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖{" "}
            </button>
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

export default Cart;
