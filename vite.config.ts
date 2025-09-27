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
      // output filename pattern: produce proper extensions so consumers and Node can distinguish ESM vs CJS
      // es -> componentsName.es.js
      // cjs -> componentsName.cjs
      // umd -> componentsName.umd.js
      fileName: (format) => {
        if (format === 'cjs') return `componentsName.cjs`;
        if (format === 'es') return `componentsName.es.js`;
        return `componentsName.${format}.js`;
      },
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      // external: ["react", "react-dom"],
      // ensure UMD build references the correct global variable names for externals
      // output: {
      //   globals: {
      //     react: 'React',
      //     'react-dom': 'ReactDOM'
      //   }
      // },
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
