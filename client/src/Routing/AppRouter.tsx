import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ManageRoles from "../features/UserManagement/ManageRoles";
import ManageUsers from "../features/UserManagement/ManageUsers";
import UserManagement from "../features/UserManagement/UserManagement";
import { ROUTES } from "./routes";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      index: true,
      element: <Navigate to={ROUTES.MANAGE_USERS.path} replace />,
    },
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
