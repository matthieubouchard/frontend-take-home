import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Table,
  TabNav,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {data} from "../../server/src/data";
import {map, keyBy} from "lodash";
const {users, roles} = data;
const roleDict = keyBy(roles, "id");
function MenuOptions() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit User</DropdownMenu.Item>
        <DropdownMenu.Item>Delete User</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function App() {
  return (
    <Container maxWidth="840px">
      <TabNav.Root mb="5">
        <TabNav.Link href="#">Users</TabNav.Link>
        <TabNav.Link href="#">Roles</TabNav.Link>
      </TabNav.Root>
      <Flex gap="4" mb="5" width="100">
        <Box flexGrow="2">
          <TextField.Root
            size="2"
            variant="classic"
            placeholder="Search by name…"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Button>
          <PlusIcon />
          Add User
        </Button>
      </Flex>

      <Table.Root variant="surface" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell px="3">
              <Text>User</Text>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">
              <Text>Role</Text>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3">
              <Text>Joined</Text>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell px="3"></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(users, (user) => {
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
                    <Text>
                      {user.first} {user.last}
                    </Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell px="3">
                  <Text>{roleDict[user.roleId].name}</Text>
                </Table.Cell>
                <Table.Cell px="3">
                  <Text>{user.createdAt}</Text>
                </Table.Cell>
                <Table.Cell px="3" justify="end">
                  <MenuOptions />
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell justify="end" px="3">
              <Flex gap="3">
                <Button size="1" color="gray" disabled>
                  Previous
                </Button>
                <Button size="1" color="gray">
                  Next
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Container>
  );
}

export default App;
