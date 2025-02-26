import { Root as ControlledRootDialog } from "@radix-ui/react-dialog";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";
import { api, Role } from "../../store/api";

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
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { name: props?.role?.name } });
  const handleUpdateRole = async (data: FormData) => {
    try {
      await updateRole({
        id: props.role.id,
        data: {
          name: data.name,
        },
      });
    } catch (err) {
      console.error("Failed to updateRole:", err);
    } finally {
      props.handleClose();
    }
  };
  useEffect(() => {
    if (props.role) {
      reset({ name: props.role.name });
    }
  }, [props.role, reset]);

  return (
    <>
      <Loader loading={isLoading} />
      <ControlledRootDialog open onOpenChange={props.handleClose}>
        <Dialog.Content>
          <Dialog.Title>Update role</Dialog.Title>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                {...register("name", { required: "Required" })}
                placeholder="Enter the role name"
              />
              {errors?.name && <p>{errors?.name.message}</p>}
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={props?.handleClose}>
                Cancel
              </Button>
            </Dialog.Close>

            <Button onClick={handleSubmit(handleUpdateRole)}>Save</Button>
          </Flex>
        </Dialog.Content>
      </ControlledRootDialog>
    </>
  );
}

export default RoleForm;
