import { Box } from "@chakra-ui/react";
import { Menu } from "./menu";

export const Layout = ({ children }) => {
  return (
    <Box bg={{ base: "gray.50", _dark: "gray.700" }} h={"100dvh"} w={"100dvw"}>
      <Menu />
      {children}
    </Box>
  );
};
