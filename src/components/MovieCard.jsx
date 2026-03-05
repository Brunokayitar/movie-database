import { Link } from "react-router";
import { Star } from "lucide-react";

export function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block bg-movie-card rounded-xl overflow-hidden hover:ring-2 hover:ring-[#f5c518] transition-all duration-200 hover:scale-105"
    >
      <div className="aspect-[2/3] overflow-hidden bg-movie-secondary">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white line-clamp-1 mb-1">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">{movie.year}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#f5c518] text-movie-accent" />
            <span className="text-white">{movie.rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-xs px-2 py-0.5 bg-movie-secondary text-gray-300 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
