import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { Flex, Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  } else if (loading)
    return (
      <Flex
        flexDirection="column"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Flex>
    );

  return children;
};

export default ProtectedRoute;
