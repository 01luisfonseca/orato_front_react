// src/components/Dashboard.js
import { useEffect } from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth.store";
import { Layout } from "@/components/layout";

export const Authorized = () => {
  const { signOut, user, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <Layout>
      <Box p={8}>
        <VStack spacing={4}>
          <Heading>Bienvenido al Dashboard</Heading>
          <Text>Correo: {user && user.email}</Text>
          <Button colorScheme="teal" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
};
