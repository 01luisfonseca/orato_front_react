import { Container, Heading, VStack } from "@chakra-ui/react";
import { useAuthStore } from "@/store/auth.store";
import { UsersService } from "@/services/users.service";
import { useEffect, useState } from "react";

export const Users = () => {
  const { user } = useAuthStore();

  const usersService = new UsersService(user.accessToken);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await usersService.read();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Usuarios
        </Heading>
        {/* Lista de usuarios desde el servicio. */}
      </VStack>
    </Container>
  );
};
