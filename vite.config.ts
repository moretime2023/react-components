import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolvePath("src/index.ts"),
      name: "componentsName",
      fileName: format => `componentsName.${format}.js`,
    },
    rollupOptions: {
        external: ["react", "react-dom", "@react-three/fiber", "three"],
        output: {
          globals: {
            react: "react",
            "react-dom": "react-dom",
            "@react-three/fiber": "@react-three/fiber",
            "three": "three",
          },
        },
    },
  },
})
