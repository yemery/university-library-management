import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/common/Login";
import Dashboard from "./pages/librarian/Dashboard";
import AppLayout from "./layouts/AppLayout";
import Books from "./pages/librarian/Books";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <AppLayout />, // miiddleware
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "librarian",
          // element: <Dashboard />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "books",
              element: <Books />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
