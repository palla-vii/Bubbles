import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to the backend server
      "/api": {
        target: "https://bubbles-fx11.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
