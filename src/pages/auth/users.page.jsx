import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Heading,
  VStack,
  HStack,
  Spinner,
  Flex,
  Card,
  SimpleGrid,
  Text,
  Box,
  Button,
  Pagination,
  ButtonGroup,
  IconButton,
  Field,
  Input,
} from "@chakra-ui/react";
import { useAuthStore } from "@/store/auth.store";
import { UsersService } from "@/services/users.service";
import { dateString } from "@/config/dateString";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const Users = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [filter, setFilter] = useState({ where: {}, take: 5, skip: 0 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const { token, setValidToken } = useAuthStore();
  const query = useQuery({
    queryKey: ["users", { token, filter, page, pageSize }],
    queryFn: ({ queryKey }) => {
      const [_key, { token, filter }] = queryKey;
      const serviceInstance = new UsersService(token);
      return serviceInstance.read(filter);
    },
  });

  useEffect(() => {
    setValidToken();
  }, [setValidToken]);

  useEffect(() => {
    if (debouncedSearch === "" || debouncedSearch.length >= 3) {
      if (debouncedSearch === "") {
        setFilter((prev) => ({ ...prev, where: {} }));
        return;
      } else {
        setFilter((prev) => ({
          ...prev,
          where: { email: { contains: debouncedSearch, mode: "insensitive" } },
        }));
      }
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }));
  }, [page, pageSize]);

  useEffect(() => {
    setTotalCount(query.data?.total || 0);
  }, [query.data]);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Usuarios
        </Heading>
        <Field.Root mb={4}>
          <Field.Label>Buscador</Field.Label>
          <Input
            placeholder="Ingrese el texto a buscar"
            variant={"flushed"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field.Root>
        {/* Lista de usuarios desde el servicio. */}
        {query.isPending && (
          <Flex justify="center">
            <Spinner />
          </Flex>
        )}
        {query.isError && (
          <p>Error al cargar usuarios: {query.error.message}</p>
        )}
        {query.data && Array.isArray(query.data.data) && (
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {query.data.data.map((user) => (
                <Card.Root key={user.id} minWidth={"200px"}>
                  <Card.Body gap="4" p={4}>
                    <Text
                      fontSize="sm"
                      color={{ base: "gray.500", _dark: "gray.400" }}
                    >
                      ID: {user.id}
                    </Text>
                    <VStack gap={0}>
                      <Box
                        fontSize="2xs"
                        color={{ base: "orange.700", _dark: "orange.400" }}
                      >
                        CORREO
                      </Box>
                      <Heading size="md">{user.email}</Heading>
                    </VStack>
                    <VStack gap={0}>
                      <Box
                        fontSize="2xs"
                        color={{ base: "orange.700", _dark: "orange.400" }}
                      >
                        ESTADO
                      </Box>
                      <Text size="md">
                        {user.active ? "Activo" : "Inactivo"}
                      </Text>
                    </VStack>
                    <VStack gap={0}>
                      <Box
                        fontSize="2xs"
                        color={{ base: "orange.700", _dark: "orange.400" }}
                      >
                        CREACIÓN
                      </Box>
                      <Text size="md">{dateString(user.createdAt)}</Text>
                    </VStack>
                    <HStack justify="space-around" pt={2} mt={4} w="full">
                      <Button colorPalette="red" variant="solid" size="sm">
                        <MdDeleteOutline /> Borrar
                      </Button>
                      <Button colorPalette="teal" variant="solid" size="sm">
                        <CiEdit /> Editar
                      </Button>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
            <HStack justify="center">
              <Pagination.Root
                count={Math.ceil(totalCount / pageSize)}
                pageSize={pageSize}
                defaultPage={1}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1);
                }}
                pageSizes={[5, 10, 20, 50]}
                page={page}
                showPageSizeOptions
                maxW="240px"
              >
                <ButtonGroup variant="ghost" size="sm" w="full">
                  <Pagination.PageText format="long" flex="1" />
                  <Pagination.PrevTrigger asChild>
                    <IconButton>
                      <LuChevronLeft />
                    </IconButton>
                  </Pagination.PrevTrigger>
                  <Pagination.NextTrigger asChild>
                    <IconButton>
                      <LuChevronRight />
                    </IconButton>
                  </Pagination.NextTrigger>
                </ButtonGroup>
              </Pagination.Root>
            </HStack>
          </>
        )}
      </VStack>
    </Container>
  );
};
