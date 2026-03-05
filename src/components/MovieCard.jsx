import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img src={poster} alt={movie.Title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{movie.Title}</h3>
          <p className="text-gray-600">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
}
