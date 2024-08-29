import { useLoaderData, useNavigate } from "react-router-dom";
import CreateRatingForm from "../components/CreateRatingForm";
import axios from "axios";

export default function MovieDetailPage() {
  const { movie } = useLoaderData();
  
  const navigate = useNavigate();
  // console.log(movie);
  
  const handleCreateRating = async (e, {score}) => {
    e.preventDefault();
    const res = await axios.post('/api/ratings', { score: score, movieId: movie.movieId });
    if (res.data) {
      navigate('/me');
    }


  }
  return (
    <div className="body">
      <h1 className="page-title">{movie.title}</h1>
      <img src={movie.posterPath} style={{width: '200px'} }/>
      <p>{movie.overview}</p>
      <h2>Rate this movie</h2>
      <CreateRatingForm onCreateRating={handleCreateRating} />
    </div>
  );
}