import { Text, Center, VStack } from "@chakra-ui/react";
import SearchBarLayout from "../Layout/SearchBarLayout";

const PageNotFound = () => {
  return (
    <SearchBarLayout>
      <Center height={"100%"} width={"100%"}>
        <VStack>
          <Text fontSize={40} fontWeight={"extrabold"}>
            404
          </Text>
          <Text fontSize={20} fontWeight={"extrabold"}>
            ¯\_(ツ)_/¯
          </Text>
          <Text>Page Not Found</Text>
        </VStack>
      </Center>
    </SearchBarLayout>
  );
};

export default PageNotFound;
