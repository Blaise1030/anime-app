import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton, HStack, Switch } from "@chakra-ui/react";
import React from "react";

const ColorModeSwitcher = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <React.Fragment>
      <IconButton
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        display={["flex", "flex", "none"]}
        aria-label="Search Anime"
        onClick={toggleColorMode}
      />
      <HStack display={["none", "none", "flex"]}>
        <SunIcon />
        <Switch
          defaultChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          colorScheme="black"
        />
        <MoonIcon />
      </HStack>
    </React.Fragment>
  );
};

export default ColorModeSwitcher;
