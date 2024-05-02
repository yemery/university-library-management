import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/common/Login";

export default function App() {
  const router = createBrowserRouter([{ path: "/", element: <Login /> }]);
  return <RouterProvider router={router} />;
}
