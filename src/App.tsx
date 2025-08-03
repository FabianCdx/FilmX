import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async(query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok) {
        throw new Error("Failed to fetch movies");
      } 

      const data = await response.json();
      
      if(data.response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
    } catch(error) {
      console.error(`Error while fetching Movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
      <header>
        <img src="./hero-img.png" alt="herobanner"/>
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <h1 className="text-white">{searchTerm}</h1>
      <section className="all-movies">
        <h2 className='mt-[40px]'>All Movies</h2>
        {isLoading ? (<Spinner/>) : errorMessage 
        ? (<p className='text-red-500'>{errorMessage}</p>) 
        : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
                )
              )}
            </ul>
          )
        }
      </section>
      </div>
    </main>
  )
}

export default App











/* import { useEffect, useState } from 'react' // use ist meist ein indiz für eine react hook es gibt viele react hooks. -art hilfsmittel
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import daciaFlag from './assets/dacia.png'
import './App.css'


interface CardProps {
  title: string;
  rating: number;
  actors: string[];
  recommended: boolean;
}

console.log(daciaFlag);
const FunctRenderComp = () => {
  return (
    <h2>Functional Arrow Component</h2>
  )
}


const Card = ( {title, rating, recommended, actors} : CardProps ) => {
  // States werden gebraucht um veränderungen festzustellen und diese zu rendern 
  const [hasLiked,setLike] = useState(false); // initialwert ist false hier kann eine nummer string oder was auch immer sein namenskonvention ist immer der variablename und setvariablename
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been ${hasLiked ? "Liked" : "Unliked"}`);
  },[hasLiked]);

  // wird nur einmal ausgeführt da die dependencies "[]" leer ist.
  useEffect(() => {
    console.log(`CARD RENDERED`);
  },[]);

  return ( 
    <div className='card' onClick={() => setCount((prestate)=> prestate + 1)}>
      <div>
      <h2>{title} <br/> {count || null}</h2>
      <img src={daciaFlag} alt='Dacia Flagge' className='logo logo-spin'/>
      </div>
      <span>Bewertung: {rating} | Empfohlen: {recommended ? "Ja" : "Nein"}</span>
      <p>Schauspieler: {actors}</p>
      <button onClick={ () => setLike((prevstate) => !prevstate)}>
      {hasLiked ? "❤️" : "🤍"}
      </button>
    </div>
  )
}
const App = () => {
  return(
    <div className="card-container">
      <Card title="Star Wars" rating={2} actors={["Negro", "peephole"]} recommended={false}/>
      <Card title="Gang War" rating={10} actors={["Le", "Ge"]} recommended={true}/>
      <Card title="Coffee Spring" rating={5} actors={["Mo", "Yo"]} recommended={false}/>
      <span>Both are functional arrow components... ahja und pfad zum bild {daciaFlag}</span>
    </div>
  )
}

export default App
 */