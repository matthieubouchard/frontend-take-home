import {Box, Container, TabNav} from "@radix-ui/themes";
import {Outlet} from "react-router-dom";
import {ROUTES} from "../../Routing/routes";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {map} from "lodash";

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
    <Box
      style={{
        padding: "var(--space-7, 40px) 8px",
        display: "flex",
        justifyContent: "center",
        flex: "1 0 0",
        alignSelf: "stretch",
      }}
    >
      <Container maxWidth="840px">
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
      </Container>
    </Box>
  );
}

export default UserManagement;
