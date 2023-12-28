import { Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

export default function BottomLinks() {
  return (
    <Text
      fontSize="sm"
      fontWeight={"normal"}
      position={"absolute"}
      textAlign={"center"}
      width={"100%"}
      bottom={2}
      left={0}
    >
      Made by{" "}
      <Link
        href="https://www.github.com/jontzii"
        rel="noreferrer noopener"
        target="_blank"
        color="blue.500"
        _hover={{ color: "blue.600" }}
      >
        @Jontzii
      </Link>
      <br />
      Utilises data from{" "}
      <Link
        href="https://www.flightradar24.com"
        rel="noreferrer noopener"
        target="_blank"
        color="blue.500"
        _hover={{ color: "blue.600" }}
      >
        flightradar24.com
      </Link>
    </Text>
  );
}
