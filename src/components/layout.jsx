import { Box } from "@chakra-ui/react";
import { Menu } from "./menu";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useMenuStore } from "@/store/menu.store";

export const Layout = ({ children }) => {
  const { open, setOpen } = useMenuStore();
  const location = useLocation();

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setOpen]);

  return (
    <Box bg={{ base: "gray.50", _dark: "gray.700" }} h={"100dvh"} w={"100dvw"}>
      <Menu />
      {children}
    </Box>
  );
};
