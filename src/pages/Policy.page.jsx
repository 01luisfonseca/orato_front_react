import { Container, Heading, Box } from "@chakra-ui/react";
import { Layout } from "../components/layout";

export const Policy = () => {
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <Heading size={"3xl"} mt={4}>
          Política de Privacidad
        </Heading>

        <Box marginTop={4}>
          <Heading size={"2xl"}>1. Introducción</Heading>
          <p>
            Esta política de privacidad describe cómo manejamos sus datos
            personales en nuestra aplicación. Nos comprometemos a proteger su
            privacidad y proporcionar un entorno seguro.
          </p>
        </Box>

        <Box marginTop={4}>
          <Heading size={"2xl"}>2. Datos de inicio de sesión</Heading>
          <p>
            Nuestra aplicación no requiere datos privados para que los usuarios
            inicien sesión. No recopilamos información personal como su nombre,
            dirección, correo electrónico, etc., para este propósito.
          </p>
        </Box>

        <Box marginTop={4}>
          <Heading size={"2xl"}>3. Protección de datos ingresados</Heading>
          <p>
            Los datos ingresados por el usuario autenticado se utilizan
            exclusivamente para el funcionamiento adecuado de la aplicación.
            Bajo ninguna circunstancia venderemos, alquilaremos o compartiremos
            esos datos con terceros.
          </p>
        </Box>

        <Box marginTop={4}>
          <Heading size={"2xl"}>4. Cambios en esta política</Heading>
          <p>
            Podemos actualizar esta política de privacidad en cualquier momento.
            Le notificaremos sobre cualquier cambio publicando la nueva política
            en esta página.
          </p>
        </Box>
      </Container>
    </Layout>
  );
};
