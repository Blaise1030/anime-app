import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Kbd,
  Text,
  Spacer,
  HStack,
  Box,
  Input,
  Modal,
  Divider,
  ModalBody,
  IconButton,
  InputGroup,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  InputLeftElement,
  ModalCloseButton,
  useColorModeValue,
  VStack,
  Grid,
  GridItem,
  Button,
  ModalFooter,
  Spinner,
  Center,
  Collapse,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FOR, IF, ELSEIF } from "react-controls-statements";
import { useNavigate } from "react-router-dom";
import { UseAnimeDetailsContext } from "../Context/AnimeDetailsContext";
import { UseAnimeSearchContext } from "../Context/AnimeSearchContext";
import { ISearchDetails } from "../type";
import AnimeCard from "./AnimeCard";

const NavSearchbar = () => {
  const bg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "transparent");
  const { onClose, isOpen, onToggle } = useDisclosure();

  return (
    <React.Fragment>
      <IconButton
        display={["flex", "flex", "none"]}
        aria-label="Search Anime"
        icon={<SearchIcon />}
        onClick={onToggle}
      />
      <HStack
        bg={bg}
        padding={2}
        paddingX={3}
        shadow={"sm"}
        width={"50%"}
        rounded={"md"}
        border={"1px"}
        align={"center"}
        cursor={"pointer"}
        borderColor={borderColor}
        display={["none", "none", "flex"]}
        transitionDuration={"1s"}
        onClick={onToggle}
        _active={{
          border: "solid",
          borderColor: "blue.200",
          borderWidth: "1px",
        }}
        _hover={{
          lg: {
            cursor: "pointer",
            transform: "scale(1.02)",
          },
        }}
      >
        <Search2Icon color="gray.500" marginX={2} />
        <Text color="gray.500">Search</Text>
        <Spacer />
        <Kbd>shift</Kbd>
        <Kbd>S</Kbd>
      </HStack>
      <NavSearchModal onClose={onClose} isOpen={isOpen} />
    </React.Fragment>
  );
};

const NavSearchModal = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const navigate = useNavigate();
  const { fetchAnimeDetail } = useContext(UseAnimeDetailsContext);
  const {
    searchResult,
    onSearch,
    fetchingData,
    noResult,
    query,
    onClickSeeAll,
  } = useContext(UseAnimeSearchContext);

  const processSearchResult = () =>
    searchResult?.length > 10 ? searchResult.slice(0, 10) : searchResult;

  const onClick = (id: string) => {
    fetchAnimeDetail(id);
    navigate(`/${id}`);
    onClose();
  };

  return (
    <Modal
      size={isLargerThan1280 ? "lg" : "full"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent rounded={["none", "none", "lg"]}>
        <IF c={!isLargerThan1280} children={<ModalCloseButton />} />
        <ModalBody marginTop={[10, 10, 0]}>
          <InputGroup outline={"none"}>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              _focus={{ border: "none" }}
              outline={"none"}
              border={"none"}
              type="text"
              autoFocus
              placeholder="Search"
              onChange={(e: any) => onSearch(e?.target?.value.toString())}
            />
          </InputGroup>
          <Collapse in={Boolean(searchResult?.length)} animateOpacity>
            <Divider />
            <Box
              maxH={["100%", "100%", "60vh"]}
              className="hideScrollbar"
              overflowY={"auto"}
            >
              <FOR
                from={processSearchResult()}
                each={(e: ISearchDetails, index: number) => {
                  const onSelect = () => onClick(e.mal_id.toString());
                  return <SearchTile onClick={onSelect} key={index} e={e} />;
                }}
              />
            </Box>
          </Collapse>

          <Collapse in={fetchingData && !noResult} animateOpacity>
            <br />
            <Center children={<Spinner />} />
            <br />
          </Collapse>
          <Collapse in={!fetchingData && noResult} animateOpacity>
            <br />
            <Center children={<>No Search Results</>} />
            <br />
          </Collapse>
        </ModalBody>
        <IF c={Boolean(searchResult?.length)}>
          <ModalFooter>
            <Button
              isFullWidth
              onClick={() => {
                onClickSeeAll();
                onClose();
              }}
            >
              See All
            </Button>
          </ModalFooter>
        </IF>
      </ModalContent>
    </Modal>
  );
};

const SearchTile = ({
  onClick,
  e,
}: {
  onClick: () => void;
  e: ISearchDetails;
}) => {
  return (
    <React.Fragment>
      <Grid
        cursor={"pointer"}
        borderBottomColor={"gray.100"}
        templateColumns={["repeat(5, 1fr)", "repeat(3, 1fr)"]}
        onClick={onClick}
        width={"100%"}
        padding={3}
      >
        <AnimeCard anime={e as any} onClick={() => {}} />
        <GridItem colSpan={[3, 2]}>
          <VStack align="start" p={4}>
            <Text fontWeight={"bold"}>{e.title}</Text>
            <Text noOfLines={3} fontSize={"sm"}>
              {e.synopsis}
            </Text>
          </VStack>
        </GridItem>
      </Grid>
      <Divider />
    </React.Fragment>
  );
};

export default NavSearchbar;
