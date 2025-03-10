const API_KEY = "fec65e10acc150682ff8035e489f5a57";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchAllMovies() {
  let allMovies = new Map(); // Usamos Map para evitar duplicados
  let page = 1;
  while (allMovies.size < 214 && page <= 11) {
    // Máximo 11 páginas para asegurar 216 películas
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();
    data.results.forEach((movie) => {
      if (!allMovies.has(movie.id)) {
        allMovies.set(movie.id, movie);
      }
    });
    page++;
  }
  return Array.from(allMovies.values()).slice(0, 214); // Asegurar exactamente 216 películas únicas
}

export async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
}
