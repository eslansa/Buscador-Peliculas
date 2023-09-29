import PropTypes from 'prop-types';

export function ListOfMovies ({ movies }) {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
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