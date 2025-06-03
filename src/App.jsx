
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Search } from './components/Search';
import Spinner from './components/Spinner';
import Moviecard from './components/Moviecard';


// function App() {

//   return (
//     <>
  
//     </>
//   )
// }

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const options = {
    method:'GET',
    headers:{
      accept: 'application/json',
      authorization: `Bearer ${API_KEY}`
    }
};

const App = () => {


 const [search, setSearch] = useState('');
 const [errorMsg, setErrorMsg] = useState('');
 const [movieList, setmovieList] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
const [debounceSearch, setDebounceSearch] = useState('');

useDebounce ( () => setDebounceSearch(search), 500, [search]);

 const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMsg('');
    try{
        const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`  : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

       const response = await fetch(endpoint, options);
        
        if (!response.ok) {
              throw new Error('failed to fetch movies');  
        }

         const data = await response.json();
       
         if(data.Response === 'false'){
          setErrorMsg(data.Error || 'failed to fetch movies');
          setmovieList([]);
            return;
         }
    
         

         setmovieList(data.results || []);
        
    }
    catch(error){
      console.error(`Error fetching movie: ${error}`);
      setErrorMsg('Error fetching movies. Please try again later.');
    } finally{
      setIsLoading(false);
    }
 }



 useEffect(() => {
      fetchMovies(debounceSearch);
 }, [debounceSearch]);


  return(
    <>
    <main>
     <div className="pattern"/>
     
     <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

        <Search search={search} setSearch={setSearch}/>
      </header>

      <section className="all-movies">
        <h1 className='mt-[40px]'>Movies List</h1>

       {/* // {errorMsg && <p className='text-red-500'>{errorMsg}</p>} */}

       {isLoading ? (
       <Spinner/>
 
       ): errorMsg ? (
        <p className='text-red-500'>{errorMsg}</p>
       ): (
        <ul>
          {movieList.map((movie) => (
            <Moviecard key={movie.id} movie={movie} />
          ))}
        </ul>
       )
      }
       
      </section>
            

     </div>
     </main>
    </>
  );

}


export default App;
