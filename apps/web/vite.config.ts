import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "SALIGAN",
        short_name: "SALIGAN",
        description: "Offline-first internship records and OJT management platform",
        theme_color: "#111111",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
      },
      workbox: {
        navigateFallback: "/index.html",
      },
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
