import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Auth from "./middleware/Auth";

import Login from "./pages/common/Login";
import Books from "./pages/common/Books";
import Borrow from "./pages/common/Borrow";
import Profile from "./pages/common/Profile";
import Unauthorized from "./pages/common/Unauthorized";
import LibrarianAdminDashboard from "./pages/common/Dashboard";
import ErrorPage from "./pages/common/ErrorPage";
import StudentDashboard from "./pages/student/Dashboard";
import Users from "./pages/admin/Users";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <Auth component={AppLayout} />,
      children: [
        {
          path: "librarian",
          children: [
            {
              path: "dashboard",
              element: <Auth component={LibrarianAdminDashboard} />,
            },
            {
              path: "books",
              element: <Auth component={Books} />,
            },
            {
              path: "borrows",
              element: <Auth component={Borrow} />,
            },
            {
              path: "profile",
              element: <Auth component={Profile} />,
            },
          ],
        },
        {
          path: "admin",
          children: [
            {
              path: "dashboard",
              element: <Auth component={LibrarianAdminDashboard} />,
            },
            {
              path: "users",
              element: <Auth component={Users} />,
            },
            {
              path: "profile",
              element: <Auth component={Profile} />,
            },
          ],
        },
        {
          path: "student",
          children: [
            {
              path: "dashboard",
              element: <Auth component={StudentDashboard} />,
            },
            { path: "books", element: <Auth component={Books} /> },
            { path: "borrows", element: <Auth component={Borrow} /> },
            { path: "profile", element: <Auth component={Profile} /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
