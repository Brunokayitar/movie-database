import { Link, useLocation } from "react-router";
import { Film, History } from "lucide-react";

export function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-movie-darker border-b border-[#2a3f52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-movie-accent" />
            <span className="text-2xl font-bold text-white">
              Movie<span className="text-movie-accent">Match</span>
            </span>
          </Link>
          
          <Link
            to="/history"
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              location.pathname === "/history"
                ? "bg-movie-accent text-[#1a2634]"
                : "bg-movie-secondary text-white hover:bg-[#3a4f62]"
            }`}
          >
            <History className="w-5 h-5" />
            <span className="hidden sm:inline">Watch History</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
