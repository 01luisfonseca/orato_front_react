import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  Button,
  Field,
  Fieldset,
  Stack,
  chakra,
  Box,
  Avatar,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/store/auth.store";
import logo from "/orato.png";
import { toaster } from "@/components/ui/toaster";

const CFaUserAlt = chakra(FaUserAlt);

export const Recovery = () => {
  const { user, loading, resetPassword } = useAuthStore();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(email);
      toaster.create({
        title: "Éxito",
        description: "Revisa tu correo para restablecer tu contraseña.",
        closable: true,
        type: "success",
      });
      handleGoToLogin();
    } catch (error) {
      setErrorMessage("No fue posible enviar una recuperación de contraseña.");
      console.error("Error al recuperar contraseña", error);
    }
    setIsLoading(false);
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (user && !loading) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <Box bg={{ base: "gray.50", _dark: "gray.600" }}>
      {loading ? (
        <Flex
          flexDirection="column"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          height="100vh"
          justifyContent="center"
          alignItems="center"
          padding={4}
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar.Root
              size={"2xl"}
              cursor={"pointer"}
              onClick={() => navigate("/")}
            >
              <Avatar.Fallback name="Orato" bg={"teal.400"} padding={4} />
              <Avatar.Image src={logo} />
            </Avatar.Root>
            <Heading color="teal.400">Recuperación de contraseña</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={handleSubmit}>
                <Fieldset.Root size="lg" invalid>
                  <Fieldset.Content>
                    <Field.Root orientation="horizontal">
                      <InputGroup
                        background={"white"}
                        startElement={<CFaUserAlt color="gray.300" />}
                      >
                        <Input
                          type="email"
                          placeholder="Correo válido"
                          bg={{ base: "white", _dark: "gray.700" }}
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </Field.Root>
                    {errorMessage && (
                      <Alert.Root status="error">
                        <Alert.Indicator />
                        <Alert.Content>
                          <Alert.Title>Error</Alert.Title>
                          <Alert.Description>{errorMessage}</Alert.Description>
                        </Alert.Content>
                      </Alert.Root>
                    )}
                    <Flex justifyContent="flex-end" mb={4} mt={2}>
                      <Button
                        type="button"
                        variant="link"
                        colorScheme="teal"
                        onClick={handleGoToLogin}
                      >
                        Ir a iniciar sesión
                      </Button>
                      <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorPalette="teal"
                        disabled={isLoading}
                      >
                        {isLoading ? <Spinner /> : "Recuperar"}
                      </Button>
                    </Flex>
                  </Fieldset.Content>
                </Fieldset.Root>
              </form>
            </Box>
          </Stack>
        </Flex>
      )}
    </Box>
  );
};
