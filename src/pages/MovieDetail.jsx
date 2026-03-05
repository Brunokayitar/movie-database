import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Star, Clock, Calendar, Plus, Check } from "lucide-react";
import { Header } from "../components/Header";
import { MOVIES } from "../data/movies";

export function MovieDetail() {
  const { id } = useParams();
  const movie = MOVIES.find((m) => m.id === Number(id));
  const [isInHistory, setIsInHistory] = useState(false);

  useEffect(() => {
    if (movie) {
      const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      setIsInHistory(history.some((h) => h.id === movie.id));
    }
  }, [movie]);

  const handleAddToHistory = () => {
    if (!movie) return;
    
    const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
    
    if (!history.some((h) => h.id === movie.id)) {
      const updatedHistory = [
        ...history,
        {
          ...movie,
          watchedAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
      setIsInHistory(true);
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-movie-dark">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-white text-xl">Movie not found</p>
          <Link to="/" className="text-movie-accent hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-movie-dark">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to search
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="aspect-[2/3] rounded-xl overflow-hidden bg-movie-secondary shadow-2xl">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-movie-card rounded-xl p-6 sm:p-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-6 h-6 fill-[#f5c518] text-movie-accent" />
                  <span className="text-white text-xl font-semibold">{movie.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-4 py-1.5 bg-movie-secondary text-movie-accent rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">Plot</h2>
                <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">Director</h2>
                <p className="text-gray-300">{movie.director}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Cast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {movie.cast.map((actor) => (
                    <div
                      key={actor}
                      className="px-4 py-3 bg-movie-secondary text-gray-200 rounded-lg"
                    >
                      {actor}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToHistory}
                disabled={isInHistory}
                className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                  isInHistory
                    ? "bg-movie-secondary text-gray-400 cursor-not-allowed"
                    : "bg-movie-accent text-[#1a2634] hover:bg-[#e6b817]"
                }`}
              >
                {isInHistory ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Watch History
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add to Watch History
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
