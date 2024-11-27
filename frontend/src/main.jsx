import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
