import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import MyPortfolio from "../views/MyPortfolio";
import Detail from "../views/Detail";

const serverUrl = "http://35.185.177.26";

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
        element: <Register serverUrl={serverUrl}/>,
      },
      {
        path: "/login",
        element: <Login serverUrl={serverUrl}/>,
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
        element: <Home serverUrl={serverUrl}/>,
      },
      {
        path: "/my-portfolio",
        element: <MyPortfolio serverUrl={serverUrl}/>,
      },
      {
        path: "/coins/:name",
        element: <Detail serverUrl={serverUrl}/>,
      },
    ],
  },
]);

export default router;
