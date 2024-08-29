import { useLoaderData, NavLink } from "react-router-dom";

export default function YourRatingsPage() {
  const { ratings } = useLoaderData();
  
  const myRatings = ratings.map(({ ratingId, score, movie, movieId}) => {
    const { title } = movie;

    return (
    <li key={ratingId}>
      <NavLink to={`/movies/${movieId}`}>{title}</NavLink>: {score}
    </li>
    );
  });
  
  return (
    <>
      <h1>Your Ratings</h1>
      <ul>{myRatings}</ul>
    </>
  );
}
