import {
  GridItem,
  AspectRatio,
  Box,
  VStack,
  HStack,
  Badge,
  Spacer,
  Skeleton,
} from "@chakra-ui/react";
import { memo } from "react";
import { IF, ELSE } from "react-controls-statements";

import { IAnime } from "../type";

const AnimeCard = memo(
  ({
    anime,
    onClick,
    disableHover,
  }: {
    disableHover?: boolean;
    anime?: IAnime;
    onClick: (id: string) => void;
  }) => {
    const active = {
      border: "solid",
      borderColor: "blue.200",
      borderWidth: "1px",
      transitionDuration: "500ms",
    };

    const hover = {
      lg: {
        transform: "scale(1.02)",
        transitionDuration: "500ms",
      },
    };

    return (
      <GridItem colSpan={[2, 1, 1]}>
        <AspectRatio ratio={3 / 4}>
          <IF c={Boolean(anime)}>
            <Box
              onClick={() => onClick(anime?.mal_id.toString() || "")}
              backgroundImage={anime?.image_url}
              backgroundSize={"100% 100%"}
              position={"relative"}
              objectFit={"cover"}
              cursor={"pointer"}
              _active={active}
              rounded={"md"}
              _hover={!disableHover ? hover : {}}
            >
              <VStack
                position={"absolute"}
                height={"100%"}
                width={"100%"}
                fontSize={12}
                p={2}
              >
                <HStack align={"start"} width={"100%"} fontWeight={"bold"}>
                  <Badge variant={"solid"} fontWeight={"black"}>
                    {anime?.type}
                  </Badge>
                </HStack>
                <Spacer />
                <Badge
                  colorScheme="teal"
                  fontWeight={"bold"}
                  variant={"solid"}
                  width={"100%"}
                  isTruncated
                >
                  {anime?.title}
                </Badge>
              </VStack>
            </Box>
            <ELSE />
            <Skeleton rounded={"md"} />
          </IF>
        </AspectRatio>
      </GridItem>
    );
  }
);

export default AnimeCard;
