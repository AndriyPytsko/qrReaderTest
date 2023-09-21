import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeScreen } from "./screens/home/homeScreen";
import { BasketScreen } from "./screens/basket/basketScreen";
import { LoginScreen } from "./screens/login/loginScreen";
import Root from "./Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
        },
        {
          path: "/basket",
          element: <BasketScreen />,
        },
        {
          path: "/login",
          element: <LoginScreen />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
