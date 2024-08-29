import { useLoaderData, NavLink } from "react-router-dom";

export default function AllMoviesPage() {
  const { movies } = useLoaderData()

  const movieListItems = movies.map((movie) => {
    return <li key={movie.movieId}>
      <NavLink to={`/movies/${movie.movieId}`}>{movie.title}</NavLink>

    </li>
  })
  return (
    <div className="body">
      <h1 className="page-title">All Movies</h1>
      <ul id="all-movie-list">
        {movieListItems}
      </ul>
    </div>
  );
}
