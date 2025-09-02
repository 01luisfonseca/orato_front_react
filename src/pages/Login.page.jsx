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
  Link,
  Avatar,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/store/auth.store";
import logo from "/orato.png";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const Login = () => {
  const { user, loading, signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecoveryClick = () => {
    navigate("/recovery");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      setErrorMessage("Revisa tus credenciales.");
      console.error("Error al iniciar sesión", error);
    }
    setIsLoading(false);
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
            <Heading color="teal.400">Iniciar Sesión</Heading>
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
                          bg={{ base: "white", _dark: "gray.700" }}
                          placeholder="Correo válido"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </Field.Root>
                    <Field.Root orientation="horizontal">
                      <InputGroup
                        background={"white"}
                        startElement={<CFaLock color="gray.300" />}
                      >
                        <PasswordInput
                          placeholder="Contraseña"
                          bg={{ base: "white", _dark: "gray.700" }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                      <Field.HelperText>
                        <Link onClick={handleRecoveryClick}>
                          Olvidaste la contraseña?
                        </Link>
                      </Field.HelperText>
                    </Field.Root>
                    {errorMessage && (
                      <Alert.Root status="error">
                        <Alert.Indicator />
                        <Alert.Content>
                          <Alert.Title>Error al iniciar sesión</Alert.Title>
                          <Alert.Description>{errorMessage}</Alert.Description>
                        </Alert.Content>
                      </Alert.Root>
                    )}
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorPalette="teal"
                      width="full"
                      disabled={isLoading}
                    >
                      {isLoading ? <Spinner /> : "Entrar"}
                    </Button>
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
