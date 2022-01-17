import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton, HStack, Switch } from "@chakra-ui/react";
import React from "react";
import { IF } from "react-controls-statements";
import { ELSE } from "react-controls-statements/dist/Controls";

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
        <IF c={colorMode === "light"}>
          <Switch
            onChange={toggleColorMode}
            defaultChecked={false}
            colorScheme="black"
          />
          <ELSE />
          <Switch
            onChange={toggleColorMode}
            defaultChecked={true}
            colorScheme="black"
          />
        </IF>

        <MoonIcon />
      </HStack>
    </React.Fragment>
  );
};

export default ColorModeSwitcher;
