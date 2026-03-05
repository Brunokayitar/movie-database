import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Trash2, Star, Calendar } from "lucide-react";
import { Header } from "../components/Header";

export function WatchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");
    setHistory(storedHistory);
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire watch history?")) {
      localStorage.setItem("watchHistory", "[]");
      setHistory([]);
    }
  };

  const removeMovie = (id) => {
    const updatedHistory = history.filter((m) => m.id !== id);
    localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-movie-dark">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Watch History</h1>
            <p className="text-gray-400">
              {history.length} {history.length === 1 ? "movie" : "movies"} watched
            </p>
          </div>
          
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <Trash2 className="w-5 h-5" />
              Clear History
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((movie) => (
              <div
                key={movie.id}
                className="bg-movie-card rounded-xl overflow-hidden hover:ring-2 hover:ring-[#f5c518] transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="flex-shrink-0 w-full sm:w-32 aspect-[2/3] sm:aspect-auto sm:h-48 rounded-lg overflow-hidden bg-movie-secondary"
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link
                        to={`/movie/${movie.id}`}
                        className="text-2xl font-semibold text-white hover:text-movie-accent transition-colors line-clamp-1"
                      >
                        {movie.title}
                      </Link>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-2 mb-3">
                        <span className="text-gray-400">{movie.year}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#f5c518] text-movie-accent" />
                          <span className="text-white">{movie.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {movie.genre.map((g) => (
                          <span
                            key={g}
                            className="text-sm px-3 py-1 bg-movie-secondary text-gray-300 rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Watched on {formatDate(movie.watchedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:justify-start gap-2">
                    <button
                      onClick={() => removeMovie(movie.id)}
                      className="px-4 py-2 bg-movie-secondary text-red-400 rounded-full hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-movie-card rounded-xl">
            <p className="text-gray-400 text-lg mb-4">
              Your watch history is empty
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-movie-accent text-[#1a2634] font-semibold rounded-full hover:bg-[#e6b817] transition-colors"
            >
              Discover Movies
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}