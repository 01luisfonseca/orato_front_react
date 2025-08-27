import { Flex, Separator, Avatar, Spacer } from "@chakra-ui/react";
import logo from "/orato.png";
import { useNavigate } from "react-router";

export const Menu = () => {
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
          <div>Orato</div>
          <div>Menu</div>
        </Flex>
      </Flex>
      <Separator orientation="horizontal" />
    </>
  );
};
