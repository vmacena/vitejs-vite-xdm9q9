import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '6200b8a6'; 
const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      setMovies(response.data.Search);
    } catch (error) {
      console.error('Error fetching data: ', error);
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
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      <div className="movie-list">
        {movies.map((movie: any) => (
          <div key={movie.imdbID} className="movie">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
