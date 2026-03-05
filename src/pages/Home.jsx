import { useState } from "react";
import { Search, Shuffle } from "lucide-react";
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";
import { MOVIES } from "../data/movies";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayMovies, setDisplayMovies] = useState(MOVIES);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = MOVIES.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.some((g) =>
            g.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayMovies(filtered);
    } else {
      setDisplayMovies(MOVIES);
    }
  };

  const handleFeelingLucky = () => {
    const shuffled = [...MOVIES].sort(() => Math.random() - 0.5);
    setDisplayMovies(shuffled);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-movie-dark">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            Discover Your Next
            <br />
            <span className="text-movie-accent">Favorite Movie</span>
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-4">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, genres, or directors..."
                className="w-full pl-14 pr-4 py-4 bg-movie-secondary text-white placeholder-gray-400 rounded-full border-2 border-transparent focus:border-[#f5c518] focus:outline-none transition-colors"
              />
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="submit"
              onClick={handleSearch}
              className="px-8 py-3 bg-movie-accent text-[#1a2634] font-semibold rounded-full hover:bg-[#e6b817] transition-colors"
            >
              Search Movies
            </button>
            <button
              type="button"
              onClick={handleFeelingLucky}
              className="px-8 py-3 bg-movie-secondary text-white font-semibold rounded-full hover:bg-[#3a4f62] transition-colors flex items-center justify-center gap-2"
            >
              <Shuffle className="w-5 h-5" />
              I'm Feeling Lucky
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white">
              {searchQuery ? `Results for "${searchQuery}"` : "Popular Movies"}
            </h2>
            <span className="text-gray-400">
              {displayMovies.length} {displayMovies.length === 1 ? "movie" : "movies"}
            </span>
          </div>

          {displayMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No movies found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
