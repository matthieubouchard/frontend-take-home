import { Container, TabNav } from "@radix-ui/themes";
import { map } from "lodash";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../Routing/routes";

const UserManagementLayout = styled(Container).attrs({ maxWidth: "840px" })`
  padding: var(--space-7, 40px) 8px;
  display: flex;
  justify-content: center;
  flex: 1 0 0;
  align-self: stretch;
`;

function UserManagement() {
  const location = useLocation();

  const TABS = [
    {
      to: ROUTES.MANAGE_USERS.path,
      label: "Users",
    },
    {
      to: ROUTES.MANAGE_ROLES.path,
      label: "Roles",
    },
  ];
  return (
    <UserManagementLayout>
      <TabNav.Root mb="5">
        {map(TABS, (tab) => (
          <TabNav.Link
            asChild
            active={location.pathname === tab.to}
            key={tab.to}
          >
            <Link to={tab.to}>{tab.label}</Link>
          </TabNav.Link>
        ))}
      </TabNav.Root>
      <Outlet />
    </UserManagementLayout>
  );
}

export default UserManagement;
