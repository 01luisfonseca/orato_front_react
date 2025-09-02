import { Container, Heading, Box } from "@chakra-ui/react";
import { Layout } from "../components/layout";

export const Profile = () => {
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <Heading size={"3xl"} mt={4}>
          Perfil
        </Heading>
      </Container>
    </Layout>
  );
};
