import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails } from '../utils/api';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to search
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={poster} alt={movie.Title} className="w-full md:w-64 h-auto rounded" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.Title} ({movie.Year})</h1>
            <p className="text-gray-700 mb-4"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-gray-700 mb-4"><strong>Plot:</strong> {movie.Plot}</p>
            <p className="text-gray-700 mb-4"><strong>Cast:</strong> {movie.Actors}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {movie.Ratings && movie.Ratings.map((rating, idx) => (
                <div key={idx} className="bg-gray-100 px-3 py-1 rounded">
                  <span className="font-semibold">{rating.Source}:</span> {rating.Value}
                </div>
              ))}
            </div>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
