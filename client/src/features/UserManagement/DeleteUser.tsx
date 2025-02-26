import { Root as ControlledRootDialog } from "@radix-ui/react-dialog";
import { Button, Dialog, Flex, Strong, Text } from "@radix-ui/themes";
import Loader from "../../components/Loader";
import { api, User } from "../../store/api";

interface IUserFormProps {
  handleClose: () => void;
  user: User;
}

function DeleteUser(props: IUserFormProps) {
  const [deleteUser, { isLoading }] = api.useDeleteUserMutation();
  const handleDeleteUser = async () => {
    try {
      await deleteUser(props.user.id);
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      props.handleClose();
    }
  };

  return (
    <>
      <Loader loading={isLoading} />
      <ControlledRootDialog open onOpenChange={props?.handleClose}>
        <Dialog.Content>
          <Dialog.Title>Delete User?</Dialog.Title>
          <Dialog.Description>
            <Text>
              Are you sure? The user{" "}
              <Strong>
                {props.user.first} {props.user.last}
              </Strong>{" "}
              will be permanently deleted.
            </Text>
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="outline"
                size="2"
                color="gray"
                onClick={props.handleClose}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              color="red"
              size="2"
              variant="outline"
              onClick={handleDeleteUser}
            >
              Delete user
            </Button>
          </Flex>
        </Dialog.Content>
      </ControlledRootDialog>
    </>
  );
}

export default DeleteUser;
