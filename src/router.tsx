import { Route, Routes } from "react-router-dom";
import SearchResultPage from "./Pages/SearchResultPage";
import PageNotFound from "./Pages/PageNotFound";
import DetailsPage from "./Pages/DetailsPage";
import Homepage from "./Pages/Homepage";

const AnimeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:id" element={<DetailsPage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AnimeRouter;
