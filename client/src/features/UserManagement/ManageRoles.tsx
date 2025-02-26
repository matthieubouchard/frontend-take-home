import { DotsHorizontalIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Box, Button, DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { map } from "lodash";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DataTable from "../../components/DataTable";
import Loader from "../../components/Loader";
import TableSearch from "../../components/TableSearch";
import { api, Role } from "../../store/api";
import { formatDate } from "../../utils";
import RoleForm from "./RoleForm";

function ManageRoles() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);

  const closeModal = () => {
    setSelectedRole(undefined);
  };

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    300,
  );

  const {
    data: rolePage,
    isLoading: rolesLoading,
    isFetching: rolesFetching,
    error: rolesError,
  } = api.useGetRolesQuery({ page, search });

  const isLoading = rolesLoading || rolesFetching;
  const isError = rolesError || (!rolesLoading && !rolePage?.data);

  if (isError) return <Box>Error loading roles <Button onClick={()=> window.location.reload()}><ReloadIcon />Reload</Button></Box>;

  const columns = [
    {
      property: "name",
      name: "Name",
    },
    {
      property: "description",
      name: "Description",
    },
    {
      property: "isDefault",
      name: "Default",
    },
    {
      property: "createdAt",
      name: "Created",
      renderCell: (row: Role) => (
        <Box
          style={{
            whiteSpace: "nowrap",
            overflow: "visible",
            minWidth: "8rem",
          }}
        >
          {formatDate(row.createdAt)}
        </Box>
      ),
    },
    {
      property: "actions",
      name: "",
      renderCell: (row: Role) => (
        <Flex justify="end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" radius="full">
                <DotsHorizontalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => setSelectedRole(row)}>
                Edit Role
              </DropdownMenu.Item>
              <DropdownMenu.Item>Delete Role</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      ),
    },
  ];

  const tableData = map(rolePage?.data);

  return (
    <>
      <Loader loading={isLoading} />
      {!!selectedRole && (
        <RoleForm handleClose={closeModal} role={selectedRole} />
      )}

      <TableSearch
        handleSearchChange={handleSearchChange}
        placeholder="Search by name or description…"
        ActionSlot={
          <Button>
            <PlusIcon />
            Add Role
          </Button>
        }
      />

      <DataTable<Role>
        columns={columns}
        data={tableData}
        page={page}
        pages={rolePage?.pages || 1}
        prev={rolePage?.prev}
        next={rolePage?.next}
        onPageChange={setPage}
      />
    </>
  );
}

export default ManageRoles;
