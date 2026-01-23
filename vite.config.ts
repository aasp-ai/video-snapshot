import { defineConfig } from "vite";
import path from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "remotion/no-react", replacement: path.resolve(__dirname, "node_modules/remotion/dist/esm/no-react.mjs") },
      { find: "remotion-original", replacement: path.resolve(__dirname, "node_modules/remotion/dist/esm/index.mjs") },
      { find: "remotion", replacement: path.resolve(__dirname, "src/shims/remotion.ts") },
      { find: "@remotion/easing", replacement: path.resolve(__dirname, "src/shims/remotion-easing.ts") },
    ],
  },
})
