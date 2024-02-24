import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/spacex/", // to be used for changing the base URL while creating production build used for deploying
  plugins: [react()],
});
