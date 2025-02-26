import { Container } from "@radix-ui/themes";
import styled from "styled-components";

export const AppLayout = styled(Container).attrs({ maxWidth: "850px" })`
  padding: var(--space-7, 40px) 8px;
  display: flex;
  justify-content: center;
  flex: 1 0 0;
  align-self: stretch;
`;
