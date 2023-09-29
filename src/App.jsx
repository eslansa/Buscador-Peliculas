import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useRef, useState } from "react";

function useSearch () {
  const[search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect (() => {
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if(search === '') {
      setError('no se puede buscar una pelicula vacia')
      return
    }

    if(search.match(/^\d+$/)) {
      setError('no se puede buscar con un numero')
      return
    }

    if (search.length < 3) {
      setError('la busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)

  }, [search])

  return { search, updateSearch, error }
}


function App() {
  const [sort, setSort] = useState(false)

  const {search, updateSearch, error} = useSearch()
  const { movies, loading, getMovies } = useMovies({search, sort})

  const handleSubmit = (event) => {
    event.preventDefault()
   getMovies()
  }

  
  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }



  return (
    <div id="page">
      <h1>Buscador de Peliculas</h1>
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={search} name='query' placeholder="Avenger, Star Wars, The Matrix..." />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }

      </main>
    </div>
  );
}

export default App;
