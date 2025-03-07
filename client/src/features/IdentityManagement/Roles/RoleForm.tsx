import { Root as ControlledRootDialog } from "@radix-ui/react-dialog";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";

import Loader from "../../../components/Loader";
import { api, Role } from "../../../store/api";

interface IRoleFormProps {
  handleClose: () => void;
  role: Role;
}

interface FormData {
  name?: string;
}

function RoleForm(props: IRoleFormProps) {
  const [updateRole, { isLoading, error }] = api.useUpdateRoleMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { name: props.role.name } });

  const handleUpdateRole = async (data: FormData) => {
    try {
      await updateRole({
        id: props.role.id,
        data: {
          name: data.name,
        },
      });
      props.handleClose();
    } catch (err) {
      console.error("Failed to updateRole:", err);
    }
  };

  return (
    <ControlledRootDialog open onOpenChange={props.handleClose}>
      <Dialog.Content maxWidth="520px">
        <Dialog.Title>Update role</Dialog.Title>
        {!!error && (
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              There was an error submitting the form, please try again
            </Callout.Text>
          </Callout.Root>
        )}
        <Flex direction="column" gap="3">
          <form onSubmit={handleSubmit(handleUpdateRole)} id="updateRole">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                {...register("name", { required: "Required" })}
                placeholder="Enter the role name"
              />
              {errors?.name && (
                <Text size="1" color="red">
                  {errors?.name.message}
                </Text>
              )}
            </label>
          </form>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={props?.handleClose}>
              Cancel
            </Button>
          </Dialog.Close>

          <Button type="submit" form="updateRole" loading={isLoading}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </ControlledRootDialog>
  );
}

export default RoleForm;
