import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

if ("serviceWorker" in navigator) {
  const updateSW = registerSW({
    immediate: true,

    onOfflineReady() {
      window.alert("ShelfBox está pronto para uso offline.");
    },

    onNeedRefresh() {
      // window.alert("Uma nova versão do ShelfBox está disponível.");
      if (
        window.confirm(
          "Uma nova versão do ShelfBox está disponível, você gostaria de atualizar agora?",
        )
      ) {
        updateSW(true);
      }

      // Futuramente:
      // showToast({
      //   title: "Nova versão disponível",
      //   action: {
      //     label: "Atualizar",
      //     onPress: () => updateSW(true),
      //   },
      // });
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
