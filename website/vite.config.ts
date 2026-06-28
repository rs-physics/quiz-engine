import { defineConfig } from "vite";

export default defineConfig({
    base: "/quiz-engine/",
    server: {
        watch: {
            usePolling: true
        }
    }
});