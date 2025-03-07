import { ReactNode } from "react";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Flex, TextField } from "@radix-ui/themes";

interface ITableSearchProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ActionSlot?: ReactNode;
}
const TableSearch = ({
  handleSearchChange,
  placeholder = "Search...",
  ActionSlot,
}: ITableSearchProps) => {
  return (
    <Flex gap="2">
      <Box flexGrow="2">
        <TextField.Root
          size="2"
          variant="classic"
          placeholder={placeholder}
          onChange={handleSearchChange}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      {!!ActionSlot && <Box asChild>{ActionSlot}</Box>}
    </Flex>
  );
};

export default TableSearch;
