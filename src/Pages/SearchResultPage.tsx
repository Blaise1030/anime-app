import { Grid, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
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
  const [disabled, setDisabled] = useState(false);
  const {
    searchPageRes,
    searchPageLoading,
    searchPageTotalNum,
    searchPageNum,
    setSearchPageNum,
    pageNoResult,
  } = useContext(UseAnimeSearchContext);

  const onClick = (id: string) => {
    fetchAnimeDetail(id);
    navigate(`/${id}`);
  };

  const onSelectPageNum = (index: number) => {
    setDisabled(true);
    setSearchPageNum(index);
    setTimeout(() => setDisabled(false), 400);
  };

  return (
    <SearchBarLayout>
      <Text fontWeight={"extrabold"} paddingY={3}>
        Search Result for {searchParams.get("query")}
      </Text>
      <IF c={pageNoResult}>
        <Text>No results</Text>
      </IF>
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
        setSelectedPage={onSelectPageNum}
        pageNumber={searchPageTotalNum}
        selectedPage={searchPageNum}
        disable={disabled}
      />
    </SearchBarLayout>
  );
};

export default SearchResultPage;
