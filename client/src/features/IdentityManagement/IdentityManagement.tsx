import { TabNav } from "@radix-ui/themes";
import { map } from "lodash";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../Routing/routes";

function IdentityManagement() {
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
    <>
      <TabNav.Root size="2">
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
    </>
  );
}

export default IdentityManagement;
