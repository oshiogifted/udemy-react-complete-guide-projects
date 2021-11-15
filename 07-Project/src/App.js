import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  /* const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ]; */

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchMoviesHandler = useCallback(async () => {
    // GET
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-movies-fb42d-default-rtdb.firebaseio.com/movies.json')
      
      if (!response.ok) { // or !response.statusCode !== 200 
        throw new Error('Something went wrong');
      }
      
      const data = await response.json(); // convert from JSON obj to JS obj

      console.log(data);

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title, 
          openingText: data[key].openingText,
          release: data[key].releaseDate
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []); // no dependency because we're not using any outside state (movies, isLoading, or error)
  
  // sends an http request immediately when a component loads
  // dependency is the function (in case anything in it changes)
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    // POST
    const response = await fetch('https://react-movies-fb42d-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST', 
      body: JSON.stringify(movie), // body typically wants a JSON data. so we convert from JS obj to JSON obj
      headers: {
        'Content-Type': 'application/json' // describes the content to be sent (i.e., we're sending a content type of JSON (which is why we had to convert above btw)) Note: not required by firebase
      }
    });
    const data = await response.json(); // firebase returns json data so we convert to JS obj and console log it
    console.log(data);
  }

  let content = <p>Found no movies.</p>;
  
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
