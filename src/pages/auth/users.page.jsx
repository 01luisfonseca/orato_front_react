import { useQuery } from "@tanstack/react-query";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { useAuthStore } from "@/store/auth.store";
import { UsersService } from "@/services/users.service";

export const Users = () => {
  const { user } = useAuthStore();
  const query = useQuery({
    queryKey: ["users", user.accessToken],
    queryFn: () => {
      const serviceInstance = new UsersService(user.accessToken);
      return serviceInstance.read();
    },
  });

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Usuarios
        </Heading>
        {/* Lista de usuarios desde el servicio. */}
        {query.isPending && <p>Cargando usuarios...</p>}
        {query.isError && (
          <p>Error al cargar usuarios: {query.error.message}</p>
        )}
        {query.data && Array.isArray(query.data.data) && (
          <ul>
            {query.data.data.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        )}
      </VStack>
    </Container>
  );
};
