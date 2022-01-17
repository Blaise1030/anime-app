import { createContext, ReactElement, useEffect, useState } from "react";
import { getSeason } from "../helper";
import { IAnime } from "../type";

const initContext = {};
export const UseAnimeContext = createContext<any>(initContext);

const AnimeContext = ({ children }: { children: ReactElement }) => {
  const [animeToday, setAnimeToday] = useState<Array<IAnime>>([]);
  const [animeSeason, setAnimeSeason] = useState<Array<IAnime>>([]);
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [anime, setAnime] = useState<Array<IAnime>>([]);

  useEffect(() => {
    fetchTodayAnime();
    fetchSeason();
    fetchAnime();
  }, []);

  const fetchTodayAnime = async () => {
    try {
      const today = new Intl.DateTimeFormat("en-US", { weekday: "long" })
        .format(new Date())
        .toLowerCase();
      setFetchingData(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_ANIME_ENDPOINT}/schedule/${today}`
      );
      const json = await res.json();
      const animes = json;
      setAnimeToday(animes[today]);
      setFetchingData(false);
    } catch (e) {
      if (import.meta.env.DEV) console.log(e);
    }
  };

  const fetchAnime = async () => {
    try {
      setFetchingData(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_ANIME_ENDPOINT}/season/later`
      );
      const json = await res.json();
      const animes = json.anime;
      setAnime(animes.length > 12 ? animes.slice(0, 12) : anime);
      setFetchingData(false);
    } catch (error) {
      if (import.meta.env.DEV) console.log(error);
    }
  };

  const fetchSeason = async () => {
    const currentDate = new Date();
    try {
      setFetchingData(true);
      const res = await fetch(
        `${
          import.meta.env.VITE_APP_ANIME_ENDPOINT
        }/season/${currentDate.getFullYear()}/${getSeason(
          currentDate.getMonth()
        )}`
      );
      const json = await res.json();
      const animes = json.anime;
      setAnimeSeason(animes.length > 12 ? animes.slice(0, 12) : anime);
      setFetchingData(false);
    } catch (error) {
      if (import.meta.env.DEV) console.log(error);
    }
  };

  return (
    <UseAnimeContext.Provider
      value={{
        anime,
        setAnime,
        animeToday,
        animeSeason,
        fetchingData,
        fetchTodayAnime,
      }}
    >
      {children}
    </UseAnimeContext.Provider>
  );
};

export default AnimeContext;
