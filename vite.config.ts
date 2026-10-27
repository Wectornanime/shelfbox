import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isDev = env.VITE_APP_ENV === "dev";

  const appName = isDev ? "ShelfBox Dev" : "ShelfBox";
  const appId = isDev ? "/shelfbox-dev" : "/shelfbox";

  return {
    resolve: {
      tsconfigPaths: true,
    },

    server: {
      host: true,
    },

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          ...manifest,
          id: appId,
          name: appName,
          short_name: appName,
          orientation: "portrait-primary",
          display: "standalone",
        },
      }),
    ],
  };
});
