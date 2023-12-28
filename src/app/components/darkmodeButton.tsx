import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export default function DarkmodeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      position={"absolute"}
      top={4}
      right={4}
      onClick={toggleColorMode}
      aria-label={
        colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
}