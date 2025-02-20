import {Button, Flex, TextField, Select, Text, Dialog} from "@radix-ui/themes";
import * as ControlledDialog from "@radix-ui/react-dialog";
import {map} from "lodash";
import {api} from "../../store/api";

function EditUser(props) {
  const isCreate = !props.user;
  const [createUser] = api.useCreateUserMutation();
  const handleCreateUser = async () => {
    try {
      await createUser({
        first: "fred",
        last: "flintstone",
        roleId: props?.roles[1].id,
      });
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <ControlledDialog.Root open={true} onOpenChange={props?.handleClose}>
      <Dialog.Content>
        <Dialog.Title>{isCreate ? "Add a user" : "Edit User"}</Dialog.Title>
        {/* <Dialog.Description>Make changes to your profile.</Dialog.Description> */}
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              First Name
            </Text>
            <TextField.Root
              defaultValue={props?.user?.first}
              placeholder="Enter your first name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Last Name
            </Text>
            <TextField.Root
              defaultValue={props?.user?.last}
              placeholder="Enter your last name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            <Select.Root size="2" defaultValue={props?.user?.roleId}>
              <Select.Trigger />
              <Select.Content>
                {map(props.roles, (r) => (
                  <Select.Item key={r.id} value={r.id}>
                    {r.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={props?.handleClose}>
              Cancel
            </Button>
          </Dialog.Close>

          <Button
            onClick={async () => {
              try {
                if (isCreate) {
                  await handleCreateUser();
                }
              } catch (e) {
                console.error("Failed to save user:", e);
              } finally {
                props?.handleClose();
              }
            }}
          >
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </ControlledDialog.Root>
  );
}

export default EditUser;
