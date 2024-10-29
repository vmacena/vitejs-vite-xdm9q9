import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '6200b8a6';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Genre: string;
  Actors: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [expandedMovie, setExpandedMovie] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      setMovies(response.data.Search || []);
      setExpandedMovie(null);
      setMovieDetails(null);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const fetchMovieDetails = async (imdbID: string) => {
    if (expandedMovie === imdbID) {
      setExpandedMovie(null);
      setMovieDetails(null);
    } else {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        setMovieDetails(response.data);
        setExpandedMovie(imdbID);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, year, genre, country, etc."
        />
        <button type="submit">Search</button>
      </form>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <h2 onClick={() => fetchMovieDetails(movie.imdbID)}>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} style={{ cursor: 'pointer' }} onClick={() => fetchMovieDetails(movie.imdbID)} />
            {expandedMovie === movie.imdbID && movieDetails && (
              <div className="movie-details">
                <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                <p><strong>Director:</strong> {movieDetails.Director}</p>
                <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                <img src={movieDetails.Poster} alt={movieDetails.Title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
