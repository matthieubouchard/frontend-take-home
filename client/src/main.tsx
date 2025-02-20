import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import {Provider} from "react-redux";
import {store} from "./store";
import AppRouter from "./Routing/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="purple" radius="medium" appearance="dark">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Theme>
  </StrictMode>
);
