import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import "toastify-js/src/toastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import router from "./routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
