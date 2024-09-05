import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import "toastify-js/src/toastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

import router from "./routes/index.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="964830114337-u4ivegjn7la3sm3eiqh6j5hefm845uk0.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>;
  </StrictMode>
);
