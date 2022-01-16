import { createContext, ReactElement, useEffect, useState } from "react";
import { ISearchDetails } from "../type";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const initContext = {};
export const UseAnimeSearchContext = createContext<any>(initContext);

const AnimeSearchContext = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const [noResult, setNoResult] = useState<boolean>(false);
  const [searchPageNum, setPageNum] = useState<number>(1);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [pageNoResult, setPageNoResult] = useState<boolean>(false);
  const [searchPageLoading, setSearchPageLoading] = useState(false);
  const [searchPageTotalNum, setSeachPageTotalNum] = useState<number>(0);
  const [searchResult, setSearchResults] = useState<Array<ISearchDetails>>([]);
  const [searchPageRes, setSearchPageRes] = useState<Array<ISearchDetails>>([]);
  const [requests, setRequests] = useState<AbortController[]>([]);

  useEffect(() => {
    if (
      location.pathname === "/search" &&
      searchPageTotalNum >= 0 &&
      searchPageRes.length === 0
    )
      fetchSearchPageData(searchParams.get("query") || "");
  }, [searchPageNum, location.pathname, searchParams.get("query")]);

  const debounce = (fn: Function, delay: number) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const onClickSeeAll = () => {
    setSearchPageNum(1);
    setSearchPageLoading(true);
    setSearchPageRes(searchResult);
    navigate({
      search: `?query=${query}`,
      pathname: "/search",
    });
    setSearchPageLoading(false);
  };

  const fetchSearchPageData = debounce(async (query: string) => {
    requests.forEach((a) => a.abort());
    const controller = new AbortController();
    setRequests(requests.concat([controller]));
    document.getElementById("scroll-height")?.scrollTo(0, 0);
    try {
      setSearchPageLoading(true);
      setNoResult(false);
      setSearchResults([]);
      const res = await fetch(
        `${
          import.meta.env.VITE_APP_ANIME_ENDPOINT
        }/search/anime?q=${query}&page=${searchPageNum}`,
        {
          signal: controller.signal,
          method: "get",
        }
      );
      if (res.status === 404) setPageNoResult(true);
      const json = await res.json();
      setSeachPageTotalNum(json?.last_page);
      const results = json.results;
      setSearchPageRes(results);
      setSearchPageLoading(false);
    } catch (e: any) {
      console.log(e);
    }
  }, 400);

  const fetchSearchData = async (query: string) => {
    requests.forEach((a) => a.abort());
    const controller = new AbortController();
    setRequests(requests.concat([controller]));
    if (query.length === 0) {
      setSearchResults([]);
      setFetchingData(false);
      setNoResult(false);
    }
    setQuery(query);
    try {
      setFetchingData(true);
      setNoResult(false);
      setSearchResults([]);
      const res = await fetch(
        `${
          import.meta.env.VITE_APP_ANIME_ENDPOINT
        }/search/anime?q=${query}&page=1`,
        {
          signal: controller.signal,
          method: "get",
        }
      );
      if (res.status === 404) setNoResult(true);
      const json = await res.json();
      setSeachPageTotalNum(json?.last_page);
      const results = json.results;
      setSearchResults(results || []);
      setFetchingData(false);
    } catch (e: any) {}
  };
  const onSearch = debounce(fetchSearchData, 500);
  const setSearchPageNum = (page: number) => {
    setPageNum(page);
    setSearchPageRes([]);
  };

  return (
    <UseAnimeSearchContext.Provider
      value={{
        searchPageRes,
        pageNoResult,
        searchPageLoading,
        searchPageTotalNum,
        setSearchPageNum,
        searchPageNum,
        onClickSeeAll,
        fetchingData,
        searchResult,
        noResult,
        onSearch,
        query,
      }}
    >
      {children}
    </UseAnimeSearchContext.Provider>
  );
};

export default AnimeSearchContext;
