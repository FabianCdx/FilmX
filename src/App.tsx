import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search';
import Spinner from './components/Spinner';
import type { Movie } from './types';
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
      <header className='mt-0'>
        <div className="relative h-16"> 
          <div className="absolute inset-x-0 flex items-center justify-center">
            <img src="./favicon.png" alt="Logo" className="w-16 h-16 mask-b-from-35% mask-t-from-35% mask-r-from-35% mask-l-from-35%" /></div>
        </div>
        <img src="./hero-img.png" alt="herobanner"/>
        <h1>Entdecke <span className="text-gradient">deine Lieblingsfilme</span> in Sekunden.</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <section className="all-movies">
        <h2 className='mt-[40px]'>All Movies</h2>
        {isLoading ? (<Spinner/>) : errorMessage 
        ? (<p className='text-red-500'>{errorMessage}</p>) 
        : (
            <ul>
              {movieList.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
        }
      </section>
       
      </div>
      <footer className="bg-dark-100 shadow-inner shadow-light-100/2 m-4">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                  <a href="./" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      <img src="./favicon.png" className="h-8" alt="FilmX Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FilmX</span>
                  </a>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                      <li>
                          <a href="https://github.com/FabianCdx" className="hover:underline me-4 md:me-6">About the Dev</a>
                      </li>
                      <li>
                          <a href="https://github.com/FabianCdx/FilmX" className="hover:underline me-4 md:me-6">About the Project</a>
                      </li>
                  </ul>
              </div>
              <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
              <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="https://github.com/FabianCdx/FilmX/blob/main/LICENSE"  target='blank' className="hover:underline">FilmX</a> MIT License.</span>
              <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
              <p className="mt-1 lock text-sm text-gray-500 sm:text-center dark:text-gray-400">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </div>
      </footer>
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