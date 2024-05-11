import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/common/Login";
import Dashboard from "./pages/librarian/Dashboard";
import AppLayout from "./layouts/AppLayout";
import Books from "./pages/librarian/Books";
import Borrow from "./pages/librarian/Borrow";
import WaitingList from "./pages/librarian/WaitingList";
import Profile from "./pages/common/Profile";

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
            {
              path: "borrows",
              // element: <Borrow />,
              children:[
                {
                  path:'',
                  element:<Borrow/>
                }
                ,
                {
                  path:"waiting-list",
                  element:<WaitingList/>
                }
              ]
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
