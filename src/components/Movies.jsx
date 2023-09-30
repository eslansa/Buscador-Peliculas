import PropTypes from 'prop-types';
import CardMovies from './CardMovie';

export function ListOfMovies({ movies }) {
    return (
      <div className='movies'>
        {movies.map((movie) => (
          <CardMovies key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
  
  ListOfMovies.propTypes = {
    movies: PropTypes.array.isRequired,
  };

  
export function NoMoviesResults () {
    return (
        <p>No se encontraron películas en esta búsqueda</p>
    )
}


export function Movies ({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
};