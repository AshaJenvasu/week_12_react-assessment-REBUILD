import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/owner",
        element: <Owner />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
