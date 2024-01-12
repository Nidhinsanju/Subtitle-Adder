import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "vite-plugin-vtt",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith(".vtt")) {
          return {
            code: `export default ${JSON.stringify(code)};`,
          };
        }
      },
    },
  ],
  build: {
    outDir: "dist",
  },
});
