import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import franken from "franken-ui/plugin-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    franken({
      preflight: false,
      layer: true,
      layerExceptions: ["chart"],
    }),
  ],
});
