import {
  useColorModeValue,
  HStack,
  Spacer,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ColorModeSwitcher from "./ColorModeSwitcher";
import NavSearchbar from "./NavSearchbar";
import image from "../Assets/avatar.png";

const NavBar = () => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      borderBottom={"1px"}
      borderBottomColor={borderColor}
      width={"100%"}
      height={"68px"}
      padding={3}
      bg={bg}
    >
      <HStack width={["100%", "100%", 800]} margin={"auto"}>
        <NavBarIcon />
        <Spacer />
        <NavSearchbar />
        <Spacer display={["none", "none", "flex"]} />
        <ColorModeSwitcher />
      </HStack>
    </Box>
  );
};

const NavBarIcon = () => {
  const navigate = useNavigate();
  return (
    <HStack onClick={() => navigate("/")} cursor={"pointer"}>
      <Image src={image} height={6} width={6} />
      <Text fontWeight={"bold"} fontSize={"lg"}>
        Anime
      </Text>
    </HStack>
  );
};

export default NavBar;
