import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/common/Login";
// import LibrarianDashboard from "./pages/librarian/Dashboard";
import AppLayout from "./layouts/AppLayout";
import Books from "./pages/common/Books";
import Borrow from "./pages/common/Borrow";
import Profile from "./pages/common/Profile";
// import AdminDashboard from "./pages/admin/Dashboard";
// import authMiddleware from "./middleware/authMiddleware";
import Auth from "./middleware/Auth";
import Unauthorized from "./pages/common/Unauthorized";

// ___
// import {Dashboard as StudentDashboard} from "./pages/student/Dashboard";
import Dashboard from "./pages/librarian/Dashboard";
import ErrorPage from "./pages/common/ErrorPage";
// import {Dashboard as AdminDashboard} from "./pages/admin/Dashboard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Unauthorized",
      element: <Unauthorized />,
    },
    {
      path:'*',
      element: <ErrorPage />
    },
    {
      path: "/",
      element: <Auth component={AppLayout} />,
      // element: <AppLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "librarian",
          // element: <Dashboard />,
          children: [
            {
              path: "dashboard",
              element: <Auth component={Dashboard} />,
              // element: <Dashboard />,
              // element: <authMiddleware component={LibrarianDashboard} />,
            },
            {
              path: "books",
              element: <Auth component={Books} />,
              // element: <authMiddleware component={Books} />,
            },
            {
              path: "borrows",
              // element: <Borrow />,
              children: [
                {
                  path: "",
                  element: <Auth component={Borrow} />,
                  // element: <authMiddleware component={Borrow} />,
                },
              ],
            },
            {
              path: "profile",
              element: <Auth component={Profile} />,
              // element: <authMiddleware component={Profile} />,
            },
          ],
        },
        {
          path: "admin",
          children: [
            {
              path: "dashboard",
              // element: <Auth component={AdminDashboard} />,
              // element: <authMiddleware component={AdminDashboard} />,
            },
          ],
        },
        {
          path: "student",
          children: [
            {
              path: "dashboard",
              // element: <Auth component={StudentDashboard}/>
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
