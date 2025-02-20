interface IRoute {
  path: string;
}
export const ROUTES: Record<string, IRoute> = {
  USER_MANAGEMENT: {
    path: "/user-management",
  },
  MANAGE_USERS: {
    path: "/user-management/users",
  },
  MANAGE_ROLES: {
    path: "/user-management/roles",
  },
};
