import {
  Drawer,
  Portal,
  Button,
  CloseButton,
  Heading,
  Separator,
  Box,
  Accordion,
  Span,
  VStack,
} from "@chakra-ui/react";
import { useAuthStore } from "@/store/auth.store";
import { useMenuStore } from "@/store/menu.store";
import { toaster } from "@/components/ui/toaster";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const MenuList = () => {
  const { open, setOpen } = useMenuStore();
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [value, setValue] = useState(["second-item"]);
  const [items] = useState([
    { value: "first-item", title: "First Item", text: "Some value 1..." },
    { value: "second-item", title: "Second Item", text: "Some value 2..." },
    { value: "third-item", title: "Third Item", text: "Some value 3..." },
  ]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to log out", error);
      toaster.create({
        title: "Error",
        description: "Se presentó un error al cerrar la sesión.",
        closable: true,
        type: "error",
      });
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title fontSize={"md"}>Orato</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack>
                {user && (
                  <>
                    <Heading size={"sm"}>Hola {user?.email}</Heading>
                    <Heading size={"xs"} mb={5} cursor={"pointer"}>
                      <Link to={"/profile"}>Ver perfil</Link>
                    </Heading>
                  </>
                )}
                <ColorModeButton />
                <Link to={"/"}>
                  <Span>Inicio</Span>
                </Link>
                <Link to={"/terms"}>
                  <Span>Términos y condiciones</Span>
                </Link>
                <Link to={"/policy"}>
                  <Span>Política de privacidad</Span>
                </Link>
              </VStack>
              {user && (
                <>
                  <Separator my={4} />
                  <Heading size={"lg"} textAlign={"center"}>
                    Acciones seguras
                  </Heading>
                  <Accordion.Root
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                  >
                    {items.map((item, index) => (
                      <Accordion.Item key={index} value={item.value}>
                        <Accordion.ItemTrigger>
                          <Span flex="1">{item.title}</Span>
                          <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </>
              )}
            </Drawer.Body>
            <Drawer.Footer>
              {user ? (
                <Button colorScheme="teal" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              ) : (
                <Button colorScheme="teal" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
              )}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
