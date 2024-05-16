import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    server: {
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["*/*.*", "*.*"],
                navigateFallback: null,
            },
            manifest: {
                name: "Veterinaria ReyCan",
                short_name: "ReyCan",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                lang: "es",
                scope: "/",
                icons: [
                    {
                        src: "/icons/Logo32.png",
                        sizes: "32x32",
                        type: "image/png",
                    },
                    {
                        src: "/icons/Logo96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "/icons/Logo128.png",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "/icons/Logo256.png",
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: "/icons/Logo512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
