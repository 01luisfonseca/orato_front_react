import { Box } from "@chakra-ui/react";
import { Menu } from "./menu";

export const Layout = ({ children }) => {
  return (
    <Box bg={"gray.50"} h={"100dvh"} w={"100dvw"}>
      <Menu />
      {children}
    </Box>
  );
};
