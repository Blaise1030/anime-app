import { Button, HStack, IconButton } from "@chakra-ui/react";
import { ELSE, FOR, IF } from "react-controls-statements";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const DesktopPaginator = ({
  size = 5,
  pageNumber,
  selectedPage,
  setSelectedPage,
}: {
  size?: number;
  pageNumber: number;
  selectedPage: number;
  setSelectedPage: (a: number) => void;
}) => {
  const offset = Math.floor((selectedPage - 1) / size);
  const increment = () => setSelectedPage(selectedPage + 1);
  const decrement = () => setSelectedPage(selectedPage - 1);
  const clickButton = setSelectedPage;

  return (
    <HStack
      width={"100%"}
      paddingY={10}
      align={"center"}
      justifyContent={"center"}
    >
      <IconButton
        icon={<ArrowBackIcon />}
        disabled={offset === 0}
        onClick={decrement}
        aria-label="left"
        size={"sm"}
      />
      <FOR
        from={Array.from(Array(size).keys())}
        each={(number, _) => {
          const index = number + offset * size + 1;
          return (
            <IF c={index - 1 > pageNumber} key={number}>
              <Button disabled size={"sm"} children={<> </>}></Button>
              <ELSE />
              <Button
                colorScheme={index === selectedPage ? "teal" : "gray"}
                onClick={() => clickButton(index)}
                children={<>{index}</>}
                size={"sm"}
              />
            </IF>
          );
        }}
      />
      <IconButton
        icon={<ArrowForwardIcon />}
        disabled={offset >= Math.floor((pageNumber - 1) / size)}
        onClick={increment}
        aria-label="right"
        size={"sm"}
      />
    </HStack>
  );
};

export default DesktopPaginator;
