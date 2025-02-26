import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import AppRouter from "./Routing/AppRouter.tsx";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="purple" radius="medium" appearance="light">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Theme>
  </StrictMode>,
);
