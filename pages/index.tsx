import type { NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Flex justifyContent={"center"}>
      <Text fontWeight={500} fontSize={"6xl"}>WELCOME</Text>
    </Flex>
  );
};

export default Home;
