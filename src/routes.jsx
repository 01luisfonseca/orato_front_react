import { Routes, Route } from "react-router";
import { Home } from "./pages/Home.page";
import { Login } from "./pages/Login.page";
import { Recovery } from "./pages/Recovery.page";
import { Authorized } from "./pages/Authorized.page";
import { Terms } from "./pages/Terms.page";
import { Policy } from "./pages/Policy.page";
import { Profile } from "./pages/Profile.page";
import ProtectedRoute from "./components/protectedRoute";
import { NotFound } from "./pages/404/page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
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
