import {Dialog, Button, Flex, TextField, Select, Text} from "@radix-ui/themes";
import {map} from "lodash";
import {api} from "../../store/api";
import {PlusIcon} from "@radix-ui/react-icons";

function CreateUser(props: any) {
  const [createUser] = api.useCreateUserMutation();
  const handleCreateUser = async () => {
    try {
      await createUser({
        first: "matthew",
        last: "bouchard",
        roleId: props?.roles[0].id,
      });
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          Add User
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create user</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add a new user
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              First Name
            </Text>
            <TextField.Root placeholder="Enter your first name" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Last Name
            </Text>
            <TextField.Root placeholder="Enter your last name" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Avatar Url
            </Text>
            <TextField.Root placeholder="Enter a photo url" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            <Select.Root size="2">
              <Select.Trigger />
              <Select.Content>
                {map(props.roles, (r) => (
                  <Select.Item value={r.id}>{r.name}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleCreateUser}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default CreateUser;
