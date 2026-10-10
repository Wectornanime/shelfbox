import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import { toast } from "@heroui/react";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import "@/styles/globals.css";
import MobileLayout from "@/ui/layouts/mobileLayout.tsx";

if ("serviceWorker" in navigator) {
  const updateSW = registerSW({
    immediate: true,

    onOfflineReady() {
      const id = toast("ShelfBox está pronto para uso offline.", {
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.close(id),
          variant: "tertiary",
        },
        variant: "default",
      });
    },

    onNeedRefresh() {
      const id = toast.info("Nova versão disponível.", {
        actionProps: {
          children: "Atualizar",
          onPress: () => {
            updateSW(true);
            toast.close(id);
          },
        },
        description:
          "Uma nova versão do ShelfBox está disponível, você gostaria de atualizar agora?",
      });
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <MobileLayout>
          <App />
        </MobileLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
