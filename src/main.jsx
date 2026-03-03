import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./router/appRouter.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  </StrictMode>,
);
