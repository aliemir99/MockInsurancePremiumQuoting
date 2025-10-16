import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        port: 5173,
        https: false,
        proxy: {
            "/api": {
                target: "https://localhost:7017",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
