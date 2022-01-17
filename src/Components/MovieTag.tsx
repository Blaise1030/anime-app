import { Tag } from "@chakra-ui/react";

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

export default MovieTag;
