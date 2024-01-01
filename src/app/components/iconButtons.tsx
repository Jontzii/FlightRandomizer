import { MoonIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode, useDisclosure } from "@chakra-ui/react";
import SettingsModal from "./settingsModal";
import { SettingsModelUi } from "@/app/types/uiTypes";

export default function IconButtons({
  params,
}: {
  params: {
    userLimits: SettingsModelUi;
    setUserLimits: (val: SettingsModelUi) => void;
  };
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        position={"absolute"}
        bottom={{ base: 4 }}
        right={4}
        style={{ zIndex: 9999 }}
      >
        <IconButton
          mr={1}
          onClick={toggleColorMode}
          aria-label={
            colorMode === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
        <IconButton
          ml={1}
          aria-label={"Open settings modal"}
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      </Box>
      <SettingsModal
        params={{
          isOpen,
          onClose,
          userLimits: params.userLimits,
          setUserLimits: params.setUserLimits,
        }}
      />
    </>
  );
}
