import {
  Container,
  Heading,
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Card,
  Separator,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { useAuthStore } from "@/store/auth.store";
import { dateString } from "@/config/dateString";

export const Profile = () => {
  const { user } = useAuthStore();

  const profile = user?.profile || {};
  const fullName =
    `${user?.displayName || ""}` || `${user?.email || ""}`.trim();

  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Perfil de Usuario
          </Heading>

          <Card.Root variant="outline">
            <Card.Header overflow={"auto"}>
              <HStack spacing={5} minW={"200px"}>
                <Avatar.Root size={"xl"}>
                  <Avatar.Fallback name={fullName || "Usuario"} padding={4} />
                  <Avatar.Image src={user?.photoURL} />
                </Avatar.Root>
                <VStack align="start">
                  <Heading as="h2" size="lg">
                    {fullName || "Nombre no especificado"}
                  </Heading>
                  <Text fontSize="md" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
              </HStack>
            </Card.Header>

            <Card.Body>
              <VStack spacing={4} align="stretch">
                <Separator py={4} />
                <Box>
                  <Heading size="sm" textTransform="uppercase" mb={2}>
                    Información de la cuenta
                  </Heading>
                  <VStack align="start" spacing={1}>
                    <HStack>
                      <Text fontWeight="bold">ID:</Text>
                      <Text>{profile?.user?.id || "No disponible"}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Fecha de creación:</Text>
                      <Text>
                        {profile?.user?.createdAt
                          ? dateString(profile.user.createdAt)
                          : "No disponible"}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Última actualización:</Text>
                      <Text>
                        {profile?.user?.updatedAt
                          ? dateString(profile.user.updatedAt)
                          : "No disponible"}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Último inicio de sesión:</Text>
                      <Text>
                        {user?.metadata?.lastLoginAt
                          ? dateString(Number(user.metadata.lastLoginAt))
                          : "No disponible"}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
                <Separator py={4} />
                <Box>
                  <Heading size="sm" textTransform="uppercase" mb={2}>
                    Congregaciones asignadas
                  </Heading>
                  {/* Subtarjetas para cada congregacion asignada al usuario */}
                  <HStack align="start" spacing={3} overflow={"auto"}>
                    {profile?.congregations?.map((congregation) => (
                      <Card.Root
                        key={congregation.id}
                        variant="outline"
                        minW={"200px"}
                      >
                        <Card.Header>
                          <Heading as="h3" size="md">
                            {congregation.name}
                          </Heading>
                        </Card.Header>
                        <Card.Body>
                          {/* Lista de privilegios */}
                          <VStack align="start" spacing={1}>
                            {congregation.privilege_areas?.map((privilege) => (
                              <HStack key={privilege.id}>
                                <Text fontWeight="bold">
                                  ID {privilege.id}:
                                </Text>
                                <Text>{privilege.name}</Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Card.Body>
                      </Card.Root>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Layout>
  );
};
