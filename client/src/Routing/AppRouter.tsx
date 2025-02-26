import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import IdentityManagement from "../features/IdentityManagement/IdentityManagement";
import ManageRoles from "../features/IdentityManagement/Roles/ManageRoles";
import ManageUsers from "../features/IdentityManagement/Users/ManageUsers";
import { ROUTES } from "./routes";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      index: true,
      element: <Navigate to={ROUTES.MANAGE_USERS.path} replace />,
    },
    {
      path: ROUTES.USER_MANAGEMENT.path,
      element: <IdentityManagement />,
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
