import { Flex, Separator, Avatar, Spacer } from "@chakra-ui/react";
import logo from "/orato.png";
import { useNavigate } from "react-router";
import { CiMenuBurger } from "react-icons/ci";
import { useMenuStore } from "@/store/menu.store";
import { MenuList } from "./menuList";

export const Menu = () => {
  const { setOpen } = useMenuStore();
  const navigate = useNavigate();

  return (
    <>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
      >
        <Avatar.Root
          size={"xl"}
          onClick={() => navigate("/")}
          cursor={"pointer"}
        >
          <Avatar.Fallback name="Orato" bg={"teal.400"} padding={4} />
          <Avatar.Image src={logo} />
        </Avatar.Root>
        <Spacer />
        <Flex gap={4} alignItems={"center"}>
          <CiMenuBurger
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
          />
        </Flex>
      </Flex>
      <Separator orientation="horizontal" />
      <MenuList />
    </>
  );
};
