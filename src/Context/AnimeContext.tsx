import { createContext, ReactElement, useEffect, useState } from "react";
import { IAnime } from "../type";

const initContext = {};
export const UseAnimeContext = createContext<any>(initContext);

const AnimeContext = ({ children }: { children: ReactElement }) => {
  const [animeToday, setAnimeToday] = useState<Array<IAnime>>([]);
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [anime, setAnime] = useState<Array<IAnime>>([]);

  useEffect(() => {
    fetchTodayAnime();
    fetchAnime();
  }, []);

  const fetchTodayAnime = async () => {
    const today = new Intl.DateTimeFormat("en-US", { weekday: "long" })
      .format(new Date())
      .toLowerCase();
    setFetchingData(true);
    const res = await fetch(`https://api.jikan.moe/v3/schedule/${today}`);
    const json = await res.json();
    const animes = json;
    setAnimeToday(animes[today]);
    setFetchingData(false);
  };

  const fetchAnime = async () => {
    setFetchingData(true);
    const res = await fetch(`https://api.jikan.moe/v3/season/later`);
    const json = await res.json();
    const animes = json.anime;
    setAnime(animes?.length > 8 ? animes.slice(0, 8) : animes);
    setFetchingData(false);
  };

  return (
    <UseAnimeContext.Provider
      value={{
        anime,
        setAnime,
        animeToday,
        fetchingData,
        fetchTodayAnime,
      }}
    >
      {children}
    </UseAnimeContext.Provider>
  );
};

export default AnimeContext;
