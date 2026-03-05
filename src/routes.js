import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { WatchHistory } from "./pages/WatchHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/movie/:id",
    Component: MovieDetail,
  },
  {
    path: "/history",
    Component: WatchHistory,
  },
]);
