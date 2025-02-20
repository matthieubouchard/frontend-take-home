import {useMemo, useState} from "react";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Table,
  TextField,
} from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {map, keyBy, debounce, isEmpty} from "lodash";
import {api} from "../../store/api";
import {formatDate} from "../../utils";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
function MenuOptions(props: any) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={(e) => e?.preventDefault()}>
          <EditUser user={props.user} roles={props.roles} />
        </DropdownMenu.Item>
        <DropdownMenu.Item>Delete User</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function ManageUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1); // Reset to first page when search changes
      }, 300),
    []
  );

  const {
    data: userPage,
    isLoading,
    error,
  } = api.useGetUsersQuery({page, search});

  const {
    data: rolesData,
    isLoading: rolesLoading,
    error: rolesError,
  } = api.useGetRolesQuery({page: 1, search: ""});

  const roleDict = keyBy(rolesData?.data, "id");

  const [createUser] = api.useCreateUserMutation();
  const [updateUser] = api.useUpdateUserMutation();
  const [deleteUser] = api.useDeleteUserMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const handleCreateUser = async () => {
    try {
      await createUser({
        first: "John",
        last: "Doe",
        roleId: "some-role-id",
      });
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  const handleUpdateUser = async (id: string) => {
    try {
      await updateUser({
        id,
        data: {
          first: "Updated Name",
        },
      });
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <>
      <Flex gap="4" mb="5" width="100">
        <Box flexGrow="2">
          <TextField.Root
            size="2"
            variant="classic"
            placeholder="Search by name…"
            onChange={(e) => debouncedSetSearch(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <CreateUser roles={rolesData?.data} />
      </Flex>

      <Table.Root variant="surface" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell px="3">User</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">Joined</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3"></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!isEmpty(roleDict) &&
            map(userPage?.data, (user) => {
              return (
                <Table.Row key={user.id} align="center">
                  <Table.RowHeaderCell px="3">
                    <Flex gap="4" align="center">
                      <Avatar
                        size="1"
                        radius="full"
                        src={user.photo}
                        fallback={`${user.first[0].toUpperCase()}${user?.last[0].toUpperCase()}`}
                      />
                      {user.first} {user.last}
                    </Flex>
                  </Table.RowHeaderCell>
                  <Table.Cell px="3">{roleDict[user.roleId].name}</Table.Cell>
                  <Table.Cell px="3">{formatDate(user.createdAt)}</Table.Cell>
                  <Table.Cell px="3" justify="end">
                    <MenuOptions user={user} roles={rolesData?.data} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              Page {page} of {userPage?.pages}
            </Table.Cell>
            <Table.Cell justify="end" px="3">
              <Flex gap="3">
                <Button
                  size="1"
                  color="gray"
                  disabled={!userPage?.prev}
                  onClick={() => setPage(userPage?.prev)}
                >
                  Previous
                </Button>
                <Button
                  size="1"
                  color="gray"
                  disabled={!userPage?.next}
                  onClick={() => setPage(userPage?.next)}
                >
                  Next
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default ManageUsers;
