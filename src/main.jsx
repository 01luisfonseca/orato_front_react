import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import AuthInitializer from "./components/authInitializer";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <AuthInitializer>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster />
      </AuthInitializer>
    </Provider>
  </StrictMode>
);
