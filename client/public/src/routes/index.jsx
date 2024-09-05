import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import MyPortfolio from "../views/MyPortfolio";
import Detail from "../views/Detail";

const serverUrl = "http://localhost:300";

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }

      return null;
    },

    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }

      return null;
    },

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-portfolio",
        element: <MyPortfolio />,
      },
      {
        path: "/coins/:name",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
