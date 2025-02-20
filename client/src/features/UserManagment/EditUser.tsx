import {Dialog, Button, Flex, TextField, Select, Text} from "@radix-ui/themes";
import {map} from "lodash";

function EditUser(props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text>Edit User</Text>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              First Name
            </Text>
            <TextField.Root
              defaultValue={props.user.first}
              placeholder="Enter your first name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Last Name
            </Text>
            <TextField.Root
              defaultValue={props.user.last}
              placeholder="Enter your last name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Avatar Url
            </Text>
            <TextField.Root
              defaultValue={props.user.photo}
              placeholder="Enter a photo url"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            <Select.Root size="2" defaultValue={props.user.roleId}>
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
          <Button onClick={() => props?.handleSave()}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditUser;
