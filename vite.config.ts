import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    plugins: [solidPlugin()],
    server: { port: 5050 },
    build: { target: "esnext" }
});
