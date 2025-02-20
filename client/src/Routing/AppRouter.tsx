import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import {ROUTES} from "./routes";
import UserManagement from "../features/UserManagment/UserManagement";
import ManageUsers from "../features/UserManagment/ManageUsers";
import ManageRoles from "../features/UserManagment/ManageRoles";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.USER_MANAGEMENT.path,
      element: <UserManagement />,
      children: [
        {
          path: ROUTES.MANAGE_USERS.path,
          element: <ManageUsers />,
        },
        {
          path: ROUTES.MANAGE_ROLES.path,
          element: <ManageRoles />,
        },
        {
          path: "*",
          element: <Navigate to={ROUTES.MANAGE_USERS.path} replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
