import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/common/Login";
import LibrarianDashboard from "./pages/librarian/Dashboard";
import AppLayout from "./layouts/AppLayout";
import Books from "./pages/librarian/Books";
import Borrow from "./pages/librarian/Borrow";
import WaitingList from "./pages/librarian/WaitingList";
import Profile from "./pages/common/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import authMiddleware from "./middleware/authMiddleware";

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
              element: <authMiddleware component={LibrarianDashboard} />,
            },
            {
              path: "books",
              element: <authMiddleware component={Books} />,
            },
            {
              path: "borrows",
              // element: <Borrow />,
              children: [
                {
                  path: "",
                  element: <authMiddleware component={Borrow} />,
                },
                {
                  path: "waiting-list",
                  element: <authMiddleware component={WaitingList} />,
                },
              ],
            },
            {
              path: "profile",
              element: <authMiddleware component={Profile} />,
            },
          ],
        },
        {
          path: "admin",
          children: [
            {
              path: "dashboard",
              element: <authMiddleware component={AdminDashboard} />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
