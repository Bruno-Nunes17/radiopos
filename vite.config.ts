import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "coluna.svg",
        "cranio.svg",
        "icons.svg",
        "inferiores.svg",
        "lombar.svg",
        "pelve.svg",
        "superiores.svg",
        "torax.svg",
        "radiopos-icon.png",
        "splashscreen_laradio.png",
      ],
      manifest: {
        name: "RadioPos - Posicionamentos radiológicos",
        short_name: "RadioPos",
        description: "Aplicação para consulta de posicionamentos radiológicos.",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "favicon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "radiopos-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "radiopos-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "splashscreen_laradio.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/medias\/.*$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "api-images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),

  ],
});
