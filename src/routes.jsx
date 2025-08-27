import { Routes, Route } from "react-router";
import { Home } from "./pages/Home.page";
import { Login } from "./pages/Login.page";
import { Recovery } from "./pages/Recovery.page";
import { Authorized } from "./pages/Authorized.page";
import ProtectedRoute from "./components/protectedRoute";
import { NotFound } from "./pages/404/page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route
        path="/auth"
        element={
          <ProtectedRoute>
            <Authorized />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
