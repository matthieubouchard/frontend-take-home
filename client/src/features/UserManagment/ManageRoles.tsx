import {useMemo, useState} from "react";
import {
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
import {map, debounce} from "lodash";
import {api} from "../../store/api";
import {formatDate} from "../../utils";
function MenuOptions() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit Role</DropdownMenu.Item>
        <DropdownMenu.Item>Delete Role</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function ManageRoles() {
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
    data: rolePage,
    isLoading: rolesLoading,
    error: rolesError,
  } = api.useGetRolesQuery({page: 1, search});

  return (
    <>
      <Flex gap="4" mb="5" width="100">
        <Box flexGrow="2">
          <TextField.Root
            size="2"
            variant="classic"
            placeholder="Search by name or description…"
            onChange={(e) => debouncedSetSearch(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Button>
          <PlusIcon />
          Add Role
        </Button>
      </Flex>

      <Table.Root variant="surface" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell px="3">Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">Default</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">Created</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell px="3">
              Updated
            </Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell px="3"></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(rolePage?.data, (role) => {
            return (
              <Table.Row key={role.id} align="center">
                <Table.RowHeaderCell px="3">{role.name}</Table.RowHeaderCell>
                <Table.Cell px="3">{role.description}</Table.Cell>
                <Table.Cell px="3">{role.isDefault.toString()}</Table.Cell>
                <Table.Cell px="3">{formatDate(role.createdAt)}</Table.Cell>
                {/* <Table.Cell px="3">
                  {formatDate(role.updatedAt)}
                </Table.Cell> */}
                <Table.Cell px="3" justify="end">
                  <MenuOptions />
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              Page {page} of {rolePage?.pages}
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell justify="end" px="3">
              <Flex gap="3">
                <Button
                  size="1"
                  color="gray"
                  disabled={!rolePage?.prev}
                  onClick={() => setPage(rolePage?.prev)}
                >
                  Previous
                </Button>
                <Button
                  size="1"
                  color="gray"
                  disabled={!rolePage?.next}
                  onClick={() => setPage(rolePage?.next)}
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

export default ManageRoles;
