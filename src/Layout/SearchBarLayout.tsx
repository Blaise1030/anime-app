import { Box, Text, Center, Link, HStack } from "@chakra-ui/react";
import { LinkIcon } from "@heroicons/react/solid";
import NavBar from "../Components/NavBar";
import { ReactNode } from "react";

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
        overflowX={"hidden"}
        height={"calc(100% - 68px)"}
        id="scroll-height"
        onScroll={onScroll}
      >
        <Box
          w={["100%", "100%", "100%", 800]}
          padding="20px"
          margin="auto"
          height="100%"
        >
          {children}
          <Box width={"100%"} py={10}>
            <Center fontSize={13}>
              <Link
                href="https://www.linkedin.com/in/blaise-tiong-6800a31a9/"
                referrerPolicy="no-referrer"
                aria-label="linkedin"
                target={"_blank"}
                variant={"link"}
                size="xs"
                padding={1}
              >
                <HStack color={"gray.500"}>
                  <LinkIcon height={15} width={15} />
                  <Text>Built By Blaise With Care 2022</Text>
                </HStack>
              </Link>
            </Center>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchBarLayout;
