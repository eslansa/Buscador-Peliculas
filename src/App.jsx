import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardMovies from "./components/CardMovie";
import { useMovies } from "./hooks/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);

  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <Grid
      id="page"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
        "& > :not(style)": {
          m: 2,
          padding: 5,
        },
      }}
    >
      <Paper elevation={3}>
        <h1>Buscador de Películas</h1>
        <header>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Buscar"
              variant="outlined"
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Avenger, Star Wars, The Matrix..."
            />
            <FormControlLabel
              control={<Checkbox checked={sort} onChange={handleSort} />}
              label="Ordenar por nombre"
            />
            <Button type="submit" variant="contained" endIcon={<SearchIcon />}>
              Buscar
            </Button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </header>

        <main>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <Grid
              container
              spacing={2}
              justifyContent="center"
            >
              {movies.map((movie, index) => (
                <Grid item key={index}>
                  <CardMovies movie={movie} />
                </Grid>
              ))}
            </Grid>
          )}
        </main>
      </Paper>
    </Grid>
  );
}

export default App;