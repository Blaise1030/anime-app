import { UseAnimeDetailsContext } from "../Context/AnimeDetailsContext";
import { UseAnimeContext } from "../Context/AnimeContext";
import SearchBarLayout from "../Layout/SearchBarLayout";
import AnimeCarousel from "../Components/Carousel";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AnimeTodayCarousel from "../Components/AnimeTodayCarousel";

const Homepage = () => {
  const { fetchAnimeDetail } = useContext(UseAnimeDetailsContext);
  const { anime, animeToday, fetchingData, animeSeason } =
    useContext(UseAnimeContext);

  const navigate = useNavigate();

  const onClick = (id: string) => {
    fetchAnimeDetail(id);
    navigate(`/${id}`);
  };

  return (
    <SearchBarLayout>
      <br />
      <AnimeTodayCarousel
        todayAnime={animeToday || []}
        fetchingData={fetchingData}
        onClick={onClick}
      />
      <br />
      <AnimeCarousel
        label="Scheduled Today"
        todayAnime={animeSeason || []}
        fetchingData={fetchingData}
        onClick={onClick}
      />
      <br />
      <AnimeCarousel
        label="Upcoming"
        todayAnime={anime || []}
        fetchingData={fetchingData}
        onClick={onClick}
      />
    </SearchBarLayout>
  );
};

export default Homepage;
