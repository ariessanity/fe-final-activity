import React from "react";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../Navbar";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box px={"5%"} py={"5%"}>
        {children}
      </Box>
    </Box>
  );
};
