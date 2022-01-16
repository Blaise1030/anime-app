import { AspectRatio, Grid, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { ELSE, FOR, IF } from "react-controls-statements";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { chunks } from "../helper";
import { IAnime } from "../type";
import AnimeCard from "./AnimeCard";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const AnimeCarousel = ({
  todayAnime,
  onClick,
  fetchingData,
}: {
  todayAnime: Array<IAnime>;
  onClick: any;
  fetchingData: boolean;
}) => {
  const [index, setIndex] = useState(0);
  return (
    <IF c={fetchingData}>
      <AspectRatio width={"100%"} ratio={16 / 9}>
        <Skeleton rounded={"md"} />
      </AspectRatio>
      <ELSE />
      <AutoPlaySwipeableViews
        onChangeIndex={setIndex}
        enableMouseEvents
        index={index}
        children={chunks(todayAnime).map(
          (animePair: Array<IAnime>, index: number) => (
            <Grid
              templateColumns={["repeat(4, 1fr)", "repeat(2, 1fr)"]}
              rounded={"md"}
              key={index}
              gap={[2, 2, 5]}
              p={2}
            >
              <FOR
                from={animePair}
                each={(a, _) => (
                  <AnimeCard
                    key={a.mal_id}
                    anime={a}
                    onClick={onClick}
                    disableHover
                  />
                )}
              />
            </Grid>
          )
        )}
      />
    </IF>
  );
};

export default AnimeCarousel;
