import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found. Try a different search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
