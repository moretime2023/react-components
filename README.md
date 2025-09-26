# react-components

Minimal React + TypeScript component library built with Vite. This repository is set up for publishing to npm and supports automatic releases via semantic-release.

## Install

From npm:

```bash
npm install @moretime/react-components
# or
pnpm add @moretime/react-components
```

## Usage

ESM import:

```ts
import { Hello } from '@moretime/react-components'

// <Hello /> in your React app
```

CommonJS require (if needed):

```js
const { Hello } = require('@moretime/react-components')
```

## Development

Run the dev preview:

```bash
pnpm install
pnpm dev
```

Build:

```bash
pnpm run build
```

## Release

This repository contains a GitHub Actions workflow that will publish the package when a tag starting with `v` is pushed. It also supports semantic-release on the `release/*` branch via `secrets.NPM_TOKEN` and the default `GITHUB_TOKEN`.
# Mini React Lib (Vite + TSX)

最小的 Vite + React + TypeScript (TSX) 库模板，支持本地预览与构建为可发布到 npm 的包（ESM + CJS + types）。


快速开始:

1. 安装依赖

   npm install

2. 本地预览（开发模式）

   npm run dev

3. 构建

   npm run build

4. 发布到 npm

   - 编辑 package.json：设置合适的 "name" (例如 @your-scope/mini-react-lib)、"version"、"author"、"license"。
   - 确保你已登录 npm：npm login
   - 如果包名带 scope 并希望公开发布，运行：npm publish --access public
   - 推荐开启 npm 的 2FA（如有需要），并在 CI 中把构建结果推送到 registry

示例用法（安装后）：

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Hello } from '@your-scope/mini-react-lib'

createRoot(document.getElementById('root')!).render(<Hello name="App" />)
```

注意: 本模板将 react 和 react-dom 声明为 peerDependencies，发布包不会捆绑它们。

常见问题与排查：

- 如果看到类型错误提示未找到模块（如 'react'），请先运行 `npm install` 安装依赖。
- 如果要在 CI 中发布，请确保构建产物包含在 npm 发布的 `files` 列表中（本示例为 `dist`）。

在 Windows PowerShell 中的运行示例：

```powershell
npm install
npm run dev
# 在另一个终端中进行预览：
npm run build
npm run preview
```


