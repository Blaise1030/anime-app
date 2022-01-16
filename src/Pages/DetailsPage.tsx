import {
  AspectRatio,
  Box,
  Button,
  Text,
  Image,
  SkeletonText,
  Stack,
  VStack,
  Divider,
  Skeleton,
  Wrap,
  Tag,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
const OFFICIAL_SITE = "officialsite";

import { IF, ELSE, FOR } from "react-controls-statements";
import SearchBarLayout from "../Layout/SearchBarLayout";
import { ArrowBackIcon, LinkIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimeDetails } from "../type";
import React, { useContext, useEffect } from "react";
import nFormatter from "../helper";
import {
  HeartIcon,
  UserGroupIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { UseAnimeDetailsContext } from "../Context/AnimeDetailsContext";

const DetailsPage = () => {
  const { fetchAnimeDetail, selectedAnime, fetchingData } = useContext(
    UseAnimeDetailsContext
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  useEffect(() => {
    if (!Boolean(selectedAnime) && Boolean(id))
      fetchAnimeDetail(id?.toString() || "");
  }, []);

  return (
    <SearchBarLayout>
      <VStack p={[2, 4]}>
        <Button
          leftIcon={<ArrowBackIcon />}
          children={<>Back</>}
          colorScheme="teal"
          onClick={onBack}
          variant="ghost"
          marginRight={"auto"}
        />
        <Stack direction={["column", "row", "row"]} width={"100%"}>
          <AspectRatio ratio={3 / 4} width={"100%"} margin={"auto"}>
            <IF c={fetchingData}>
              <Skeleton rounded={"md"} />
              <ELSE />
              <Image
                src={selectedAnime?.image_url}
                rounded={"md"}
                shadow={"lg"}
              />
            </IF>
          </AspectRatio>
          <AnimeDetailsPane
            genre={selectedAnime?.genres || []}
            title={selectedAnime?.title || ""}
            fetchingData={fetchingData}
            data={selectedAnime as any}
          />
        </Stack>
        <IF c={Boolean(selectedAnime?.synopsis)}>
          <VStack align={"start"} width={"100%"} pt={[6, 10]}>
            <IF c={fetchingData}>
              <SkeletonText width={"100%"} height={50} />
              <ELSE />
              <Text fontWeight={"bold"}>{"Synopsis"}</Text>
              <Divider />
              <Box
                children={<>{selectedAnime?.synopsis}</>}
                overflowY={"auto"}
                textAlign={"justify"}
              />
              <ELSE />
            </IF>
          </VStack>
        </IF>
      </VStack>

      <Box height={[28, 10, 10]} />
    </SearchBarLayout>
  );
};

const AnimeDetailsPane = ({
  title,
  genre,
  fetchingData,
  data,
}: {
  title: string;
  data: IAnimeDetails;
  fetchingData: boolean;
  genre: Array<{ mal_id: number; type: string; name: string; url: string }>;
}) => {
  return (
    <VStack
      justify={"center"}
      marginBottom={8}
      align={"start"}
      width={"100%"}
      p={[2, 2, 5]}
    >
      <IF c={fetchingData}>
        <SkeletonText height={10} width={"100%"} />
        <ELSE />
        <Text fontSize={["2xl", "xx-small", "2xl"]} fontWeight={"extrabold"}>
          {title}
        </Text>
      </IF>
      <IF c={fetchingData}>
        <Skeleton height={10} width={"100%"} />
        <ELSE />
        <Wrap>
          <FOR
            each={(g: any, i: number) => <MovieTag {...g} key={i} index={i} />}
            from={genre}
          />
        </Wrap>
      </IF>
      <AnimeStat fetchingData={fetchingData} data={data} />
      <VisitOfficialSiteButton
        fetchingData={fetchingData}
        officialSiteLink={data?.external_links?.filter(
          ({ name }) => name.toLowerCase().replace(" ", "") === OFFICIAL_SITE
        )}
      />
    </VStack>
  );
};

const VisitOfficialSiteButton = ({
  fetchingData,
  officialSiteLink,
}: {
  fetchingData: boolean;
  officialSiteLink: Array<{ name: string; url: string }>;
}) => {
  const bg = useColorModeValue("white", "gray.800");
  const toNewPage = () => {
    if (officialSiteLink?.length)
      window.open(officialSiteLink[0].url, "_blank");
  };
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <IF c={Boolean(officialSiteLink?.length)}>
      <React.Fragment>
        <Button
          display={["none", "flex", "flex"]}
          isLoading={fetchingData}
          leftIcon={<LinkIcon />}
          colorScheme={"teal"}
          onClick={toNewPage}
          isFullWidth
        >
          Visit Official Site
        </Button>
        <Box
          display={["flex", "none", "none"]}
          position={"fixed"}
          borderTop={"1px"}
          borderTopColor={borderColor}
          width={"100%"}
          zIndex={2}
          bottom={0}
          left={0}
          bg={bg}
          p={4}
        >
          <Button
            isLoading={fetchingData}
            leftIcon={<LinkIcon />}
            colorScheme={"teal"}
            onClick={toNewPage}
            isFullWidth
          >
            Visit Official Site
          </Button>
        </Box>
      </React.Fragment>
    </IF>
  );
};

const AnimeStat = ({
  fetchingData,
  data,
}: {
  data: IAnimeDetails;
  fetchingData: boolean;
}) => {
  return (
    <Box width={"100%"} py={2}>
      <Divider />
      <Grid templateColumns={"repeat(3, 1fr)"}>
        <FOR
          from={[
            {
              icon: <HeartIcon width={20} height={20} />,
              value: nFormatter(data?.popularity, 1),
              label: "Popularity",
            },
            {
              icon: <EmojiHappyIcon width={20} height={20} />,
              value: nFormatter(data?.favorites, 1),
              label: "Favourites",
            },
            {
              icon: <UserGroupIcon width={20} height={20} />,
              value: nFormatter(data?.members, 1),
              label: "Members",
            },
          ]}
          each={({ label, value, icon }, _) => (
            <GridItem colSpan={1} p={3} key={label}>
              <Stat>
                <StatLabel>{label}</StatLabel>
                <HStack>
                  {icon}
                  <IF c={fetchingData}>
                    <Skeleton height={3} width={"100%"} />
                    <ELSE />
                    <StatNumber>{value}</StatNumber>
                  </IF>
                </HStack>
              </Stat>
            </GridItem>
          )}
        />
      </Grid>
      <Divider />
    </Box>
  );
};

const MovieTag = ({
  index,
  mal_id,
  name,
}: {
  index: number;
  mal_id: number;
  name: string;
}) => {
  const colorScheme = ["orange", "teal", "red", "blue", "purple", "yellow"];
  return (
    <Tag
      colorScheme={colorScheme[index % (colorScheme.length - 1)]}
      children={<>{name}</>}
      key={mal_id}
    />
  );
};

export default DetailsPage;
