import {
  CheckCircledIcon,
  DotsHorizontalIcon,
  InfoCircledIcon,
  PlusIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  DropdownMenu,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import { map } from "lodash";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DataTable from "../../../components/DataTable";
import Loader from "../../../components/Loader";
import TableSearch from "../../../components/TableSearch";
import { api, Role } from "../../../store/api";
import { formatDate } from "../../../utils";
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

  const isError = rolesError || (!rolesLoading && !rolePage?.data);

  if (isError)
    return (
      <Box maxWidth="30rem">
        <Callout.Root mt="5" color="crimson">
          <Flex justify="center" align="center" gap="3">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text size="3">Error loading Roles </Callout.Text>
            <Button size="2" onClick={() => window.location.reload()}>
              <ReloadIcon />
              Reload
            </Button>
          </Flex>
        </Callout.Root>
      </Box>
    );

  const columns = [
    {
      property: "name",
      name: "Name",
    },
    {
      property: "description",
      name: "Description",
      width: 0.5,
    },
    {
      property: "isDefault",
      name: "Default",
      width: 0.1,
      renderCell: (row: Role) => {
        if (!row.isDefault) {
          return null;
        }
        return (
          <Flex align="center" justify="start" pl="4">
            <CheckCircledIcon color="purple" />
          </Flex>
        );
      },
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
      width: 0.01,
      renderCell: (row: Role) => (
        <Flex justify="end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" radius="full" color="gray">
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

  const tableData = map(rolePage?.data); // safe array;

  return (
    <>
      <Loader loading={rolesFetching && !rolesLoading} />

      {!!selectedRole && (
        <RoleForm handleClose={closeModal} role={selectedRole} />
      )}

      <Box my="5">
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
      </Box>

      <DataTable<Role>
        columns={columns}
        loading={rolesLoading}
        emptyText={`No roles found that match your search: ${search}`}
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
