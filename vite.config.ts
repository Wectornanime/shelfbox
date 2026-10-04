import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

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
      allowedHosts: ["4d3e-170-245-223-122.ngrok-free.app"],
    },

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          id: appId,
          name: appName,
          short_name: appName,
          description: "Gerencie sua coleção de miniaturas",

          theme_color: "#18181b",
          background_color: "#18181b",

          display: "standalone",
          start_url: "/",

          icons: [
            {
              src: "/icons/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
  };
});
