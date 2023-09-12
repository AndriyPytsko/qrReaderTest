import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeScreen } from "./screens/home/homeScreen";
import { BasketScreen } from "./screens/basket/basketScreen";
import BasketProvider from "./providers/basketProvider/basketProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/basket",
      element: <BasketScreen />,
    },
  ]);

  return (
    <div className="app">
      <BasketProvider>
        <RouterProvider router={router} />
      </BasketProvider>
    </div>
  );
}

export default App;
