import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  ButtonGroup,
  Grid,
  HStack,
  IconButton,
  Skeleton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ELSE, FOR, IF } from "react-controls-statements";
import SwipeableViews from "react-swipeable-views";
import { chunks } from "../helper";
import { IAnime } from "../type";
import AnimeCard from "./AnimeCard";

const AutoPlaySwipeableViews = SwipeableViews;

const AnimeCarousel = ({
  todayAnime,
  onClick,
  fetchingData,
  label,
}: {
  todayAnime: Array<IAnime>;
  onClick: any;
  fetchingData: boolean;
  label: string;
}) => {
  const [index, setIndex] = useState(0);
  const onPaginatorClick = (incrementBy: number) => {
    const sectionNum = Math.ceil(todayAnime.length / 4);
    const ifInc = index + incrementBy;
    if (ifInc < 0) setIndex(sectionNum - 1);
    else if (ifInc >= sectionNum) setIndex(0);
    else setIndex(ifInc);
  };

  return (
    <IF c={fetchingData}>
      <AspectRatio width={"100%"} ratio={16 / 9}>
        <Skeleton rounded={"md"} />
      </AspectRatio>
      <ELSE />
      <HStack px={2}>
        <Text fontWeight={"extrabold"} paddingY={3}>
          {label}
        </Text>
        <Spacer />
        <ButtonGroup
          size="sm"
          isAttached
          variant="solid"
          display={["none", "flex"]}
        >
          <IconButton
            onClick={() => onPaginatorClick(-1)}
            icon={<ArrowBackIcon />}
            aria-label="Go Left"
          />
          <IconButton
            onClick={() => onPaginatorClick(1)}
            icon={<ArrowForwardIcon />}
            aria-label="Go right"
          />
        </ButtonGroup>
      </HStack>
      <AutoPlaySwipeableViews
        onChangeIndex={setIndex}
        enableMouseEvents
        index={index}
        children={chunks(todayAnime).map(
          (animePair: Array<IAnime>, index: number) => (
            <Grid
              templateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)"]}
              rounded={"md"}
              key={index}
              gap={2}
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
