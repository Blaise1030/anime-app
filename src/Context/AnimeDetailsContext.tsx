import { createContext, ReactElement, useState } from "react";
import { IAnimeDetails } from "../type";

const initContext = {};
export const UseAnimeDetailsContext = createContext<any>(initContext);

const AnimeDetailsContext = ({ children }: { children: ReactElement }) => {
  const [selectedAnime, setSelectedAnime] = useState<IAnimeDetails>();
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  const fetchAnimeDetail = async (animeId: string) => {
    try {
      setFetchingData(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_ANIME_ENDPOINT}/anime/${animeId}`
      );
      const anime = await res.json();
      setSelectedAnime(anime);
      setFetchingData(false);
    } catch (error) {
      if (import.meta.env.DEV) console.log(error);
    }
  };

  return (
    <UseAnimeDetailsContext.Provider
      value={{
        fetchingData,
        selectedAnime,
        fetchAnimeDetail,
      }}
    >
      {children}
    </UseAnimeDetailsContext.Provider>
  );
};

export default AnimeDetailsContext;
