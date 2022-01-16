import { Grid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { IF, FOR, ELSE } from "react-controls-statements";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnimeCard from "../Components/AnimeCard";
import AnimeCardSkeleton from "../Components/AnimeCardSkeleton";
import DesktopPaginator from "../Components/Paginator";
import { UseAnimeDetailsContext } from "../Context/AnimeDetailsContext";
import { UseAnimeSearchContext } from "../Context/AnimeSearchContext";
import SearchBarLayout from "../Layout/SearchBarLayout";
import { IAnime } from "../type";

const SearchResultPage = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { fetchAnimeDetail } = useContext(UseAnimeDetailsContext);
  const {
    searchPageRes,
    searchPageLoading,
    searchPageTotalNum,
    searchPageNum,
    setSearchPageNum,
  } = useContext(UseAnimeSearchContext);

  const onClick = (id: string) => {
    fetchAnimeDetail(id);
    navigate(`/${id}`);
  };

  return (
    <SearchBarLayout>
      <Text fontWeight={"extrabold"} paddingY={3}>
        Search Result for {searchParams.get("query")}
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        <IF c={searchPageLoading || searchPageRes?.length === 0}>
          <AnimeCardSkeleton />
          <ELSE />
          <FOR
            from={searchPageRes || []}
            each={(a: IAnime, index: number) => (
              <AnimeCard
                key={`${a?.mal_id}-${index}`}
                anime={a}
                onClick={onClick}
              />
            )}
          />
        </IF>
      </Grid>

      <DesktopPaginator
        setSelectedPage={setSearchPageNum}
        pageNumber={searchPageTotalNum}
        selectedPage={searchPageNum}
      />
    </SearchBarLayout>
  );
};

export default SearchResultPage;
