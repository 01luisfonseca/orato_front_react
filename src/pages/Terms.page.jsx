import { Container, Heading, Box } from "@chakra-ui/react";
import { Layout } from "../components/layout";

export const Terms = () => {
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <Heading size={"3xl"} mt={4}>
          Términos y Condiciones
        </Heading>

        <Box marginTop={4}>
          <Heading size={"2xl"}>1. Introducción</Heading>
          <p>
            Bienvenido a nuestra página de términos y condiciones. Al acceder a
            este sitio web, aceptas cumplir con los términos y condiciones
            siguientes. Si no estás de acuerdo con cualquiera de estos términos,
            no debes usar este sitio web.
          </p>
        </Box>

        <Box marginTop={4}>
          <Heading size={"2xl"}>2. Licencia para usar el sitio web</Heading>
          <p>
            A menos que se indique lo contrario, nosotros o nuestros
            licenciantes poseemos los derechos de propiedad intelectual del
            sitio web y el material en el sitio web.
          </p>
        </Box>

        <Box marginTop={4}>
          <Heading size={"2xl"}>3. Uso aceptable</Heading>
          <p>
            No debes usar este sitio web de ninguna manera que cause, o pueda
            causar, daño al sitio web o menoscabo de la disponibilidad o
            accesibilidad del sitio web.
          </p>
        </Box>

        <Box marginTop={4}>
          <Heading size={"2xl"}>4. Modificaciones</Heading>
          <p>
            Nos reservamos el derecho de revisar estos términos y condiciones de
            vez en cuando. Las condiciones revisadas se aplicarán al uso de
            nuestro sitio web a partir de la fecha de publicación.
          </p>
        </Box>
      </Container>
    </Layout>
  );
};
