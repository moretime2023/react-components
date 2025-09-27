import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import typescript from '@rollup/plugin-typescript';
const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve:{
    dedupe: ['react', 'react-dom'],
  },
  build: {
    lib: {
      entry: resolvePath("src/index.ts"),
      name: "componentsName",
      fileName: format => `componentsName.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [
        typescript({
          tsconfig: './tsconfig.app.json', // 指定 tsconfig 文件
          declaration: true, // 生成声明文件
          outputToFilesystem: false, // 不输出到文件系统
          declarationDir: 'dist', // 声明文件输出目录
          rootDir: 'src', // 源文件目录
        }),
      ]
    },
  },
})
