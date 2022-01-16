import { Box, Center, Grid, Spinner, Text } from "@chakra-ui/react";
import { FOR, IF } from "react-controls-statements";
import { useContext } from "react";
import AnimeCarousel from "../Components/Carousel";
import { ELSE } from "react-controls-statements/dist/Controls";
import { UseAnimeContext } from "../Context/AnimeContext";
import { IAnime } from "../type";
import AnimeCard from "../Components/AnimeCard";
import SearchBarLayout from "../Layout/SearchBarLayout";
import { useNavigate } from "react-router-dom";
import { UseAnimeDetailsContext } from "../Context/AnimeDetailsContext";
import AnimeCardSkeleton from "../Components/AnimeCardSkeleton";

const Homepage = () => {
  const { fetchAnimeDetail } = useContext(UseAnimeDetailsContext);
  const { anime, animeToday, fetchingData } = useContext(UseAnimeContext);

  const navigate = useNavigate();

  const onClick = (id: string) => {
    fetchAnimeDetail(id);
    navigate(`/${id}`);
  };

  return (
    <SearchBarLayout>
      <Text fontWeight={"extrabold"} paddingY={3}>
        Scheduled Today
      </Text>
      <AnimeCarousel
        todayAnime={animeToday || []}
        fetchingData={fetchingData}
        onClick={onClick}
      />
      <br />

      <Text fontWeight={"extrabold"} paddingBottom={3}>
        Upcoming
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        <IF c={fetchingData}>
          <AnimeCardSkeleton />
          <ELSE />
          <FOR
            from={anime}
            each={(a: IAnime, index: number) => (
              <AnimeCard
                key={`${a?.mal_id}-${index}`}
                onClick={onClick}
                anime={a}
              />
            )}
          />
        </IF>
      </Grid>
      <Box height={20} />
    </SearchBarLayout>
  );
};

export default Homepage;
