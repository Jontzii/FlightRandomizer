"use client"

import { Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";

export default function BottomLinks() {
  return (
    <Text
      fontSize="sm"
      fontWeight={"normal"}
      position={"absolute"}
      textAlign={{ base: "left", md: "center" }}
      pl={{ base: 2, md: 0 }}
      width={"100%"}
      bottom={2}
      left={0}
    >
      Created by{" "}
      <Link
        as={NextLink}
        href="https://www.github.com/jontzii"
        rel="noreferrer noopener"
        target="_blank"
        color="blue.500"
        _hover={{ color: "blue.600" }}
      >
        @Jontzii
      </Link>
      {" - "}
      <Link
        as={NextLink}
        href="https://github.com/Jontzii/FlightRandomizer"
        rel="noreferrer noopener"
        target="_blank"
        color="blue.500"
        _hover={{ color: "blue.600" }}
      >
        Sources
      </Link>
      <br />
      Utilises data from{" "}
      <Link
        as={NextLink}
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
