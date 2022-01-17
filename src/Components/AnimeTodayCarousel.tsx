import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { IF, ELSE, FOR } from "react-controls-statements";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { IAnime } from "../type";
import AnimeCard from "./AnimeCard";
import MovieTag from "./MovieTag";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const AnimeTodayCarousel = ({
  fetchingData,
  todayAnime,
  onClick,
}: {
  todayAnime: Array<IAnime>;
  fetchingData: boolean;
  onClick: any;
}) => {
  const [index, setIndex] = useState(0);
  const onPaginatorClick = (incrementBy: number) => {
    const sectionNum = todayAnime.length;
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
      <AutoPlaySwipeableViews
        onChangeIndex={setIndex}
        enableMouseEvents
        index={index}
        children={todayAnime.map((anime: IAnime, index: number) => (
          <Box key={index} p={2}>
            <Grid
              templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)"]}
              padding={2}
              key={index}
            >
              <AnimeCard onClick={onClick} anime={anime} disableHover />
              <GridItem colSpan={[2, 1, 1]} p={[2, 2, 5]}>
                <VStack align={"start"} justify="end" height={"100%"}>
                  <IF c={fetchingData}>
                    <SkeletonText height={10} width={"100%"} />
                    <ELSE />
                    <Text
                      fontWeight={"extrabold"}
                      fontSize={["2xl"]}
                      noOfLines={[1, 5]}
                    >
                      {anime?.title}
                    </Text>
                  </IF>
                  <IF c={fetchingData}>
                    <Skeleton height={10} width={"100%"} />
                    <ELSE />
                    <Wrap>
                      <FOR
                        from={(anime as any)?.genres}
                        each={(g: any, i: number) => (
                          <MovieTag {...g} key={i} index={i} />
                        )}
                      />
                    </Wrap>
                  </IF>
                  <IF c={fetchingData}>
                    <SkeletonText height={10} width={"100%"} />
                    <ELSE />
                    <Text pt={2} fontWeight={"extrabold"}>
                      Synopsis
                    </Text>
                    <Divider />
                    <Text noOfLines={[2, 5]} textAlign={"justify"}>
                      {(anime as any)?.synopsis}
                    </Text>
                  </IF>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        ))}
      />
      <HStack px={2}>
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
    </IF>
  );
};

export default AnimeTodayCarousel;
