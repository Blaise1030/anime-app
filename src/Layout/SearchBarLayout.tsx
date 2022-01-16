import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavBar from "../Components/NavBar";

const SearchBarLayout = ({
  children,
  onScroll,
}: {
  children: ReactNode;
  onScroll?: (e: any) => void;
}) => {
  return (
    <>
      <NavBar />
      <Box
        width={"100%"}
        overflowY={"auto"}
        height={"calc(100% - 68px)"}
        id="scroll-height"
        onScroll={onScroll}
      >
        <Box
          w={["100%", "100%", 800]}
          padding="20px"
          margin="auto"
          height="100%"
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SearchBarLayout;
