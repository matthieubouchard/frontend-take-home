import {
  DotsHorizontalIcon,
  InfoCircledIcon,
  PlusIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Callout,
  DropdownMenu,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import { isEmpty, keyBy, map } from "lodash";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DataTable from "../../../components/DataTable";
import Loader from "../../../components/Loader";
import TableSearch from "../../../components/TableSearch";
import { api, User } from "../../../store/api";
import { formatDate } from "../../../utils";
import DeleteUser from "./DeleteUser";
import UserForm from "./UserForm";

function ManageUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [userToDelete, setUserToDelete] = useState<User | undefined>(undefined);

  const closeModal = () => {
    setUserModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(undefined);
  };

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    300,
  );

  const {
    data: userPage,
    isLoading: usersLoading,
    isFetching: usersFetching,
    error: userError,
  } = api.useGetUsersQuery({ page, search });

  const {
    data: rolePage,
    isLoading: rolesLoading,
    error: rolesError,
  } = api.useGetRolesQuery({ page: 1, search: "" });

  const roleDict = keyBy(rolePage?.data, "id");

  const isLoading = rolesLoading || usersLoading;
  const isError =
    userError ||
    rolesError ||
    (!rolesLoading && !rolePage?.data) ||
    (!usersLoading && !userPage?.data);

  if (isError)
    return (
      <Box maxWidth="30rem">
        <Callout.Root mt="5" color="crimson">
          <Flex justify="center" align="center" gap="3">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text size="3">Error loading Users or Roles </Callout.Text>
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
      property: "display",
      name: "User",
      renderCell: (row: User) => (
        <Flex gap="2" align="center">
          <Avatar
            size="1"
            radius="full"
            src={row.photo}
            fallback={`${row.first[0].toUpperCase()}${row?.last[0].toUpperCase()}`}
          />
          {row.first} {row.last}
        </Flex>
      ),
    },
    {
      property: "roleId",
      name: "Role",
      renderCell: (row: User) =>
        !isEmpty(roleDict) ? roleDict[row.roleId].name : "",
    },
    {
      property: "createdAt",
      name: "Joined",
      renderCell: (row: User) => formatDate(row.createdAt),
    },
    {
      property: "actions",
      name: "",
      width: 0.1,
      renderCell: (row: User) => (
        <Flex justify="end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" radius="full" color="gray">
                <DotsHorizontalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => setSelectedUser(row)}>
                Edit User
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setUserToDelete(row)}>
                Delete User
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      ),
    },
  ];

  const tableData = map(userPage?.data);

  return (
    <>
      <Loader loading={usersFetching && !usersLoading} />
      {(!!selectedUser || userModalOpen) && (
        <UserForm
          handleClose={closeModal}
          roles={rolePage?.data ?? []}
          user={selectedUser}
        />
      )}
      {!!userToDelete && (
        <DeleteUser handleClose={handleCloseDeleteModal} user={userToDelete} />
      )}

      <Box my="5">
        <TableSearch
          handleSearchChange={handleSearchChange}
          placeholder="Search by name…"
          ActionSlot={
            <Button onClick={() => setUserModalOpen(true)}>
              <PlusIcon />
              Add User
            </Button>
          }
        />
      </Box>

      <DataTable<User>
        loading={isLoading}
        fetching={usersFetching}
        emptyText={`No users found that match your search: ${search}`}
        columns={columns}
        data={tableData}
        page={page}
        pages={userPage?.pages || 1}
        prev={userPage?.prev}
        next={userPage?.next}
        onPageChange={setPage}
      />
    </>
  );
}

export default ManageUsers;
