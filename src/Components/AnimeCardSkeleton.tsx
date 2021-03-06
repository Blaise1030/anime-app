import { FOR } from "react-controls-statements";
import AnimeCard from "./AnimeCard";

const AnimeCardSkeleton = () => {
  return (
    <FOR
      each={(n: number) => <AnimeCard key={n} onClick={() => {}} />}
      from={Array.from(Array(20).keys())}
    />
  );
};

export default AnimeCardSkeleton;
