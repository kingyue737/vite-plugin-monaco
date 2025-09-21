# vite-plugin-monaco

[![npm version](https://img.shields.io/npm/v/vite-plugin-monaco)](https://www.npmjs.com/package/vite-plugin-monaco)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-monaco)](https://www.npmjs.com/package/vite-plugin-monaco)

A plugin to simplify loading the [Monaco Editor](https://github.com/microsoft/monaco-editor) with vite.

## Install

```bash
pnpm add -D vite-plugin-monaco
# or
npm i -D vite-plugin-monaco
# or
yarn add -D vite-plugin-monaco
```

## Virtual Module

### Client Types

If you want type definition of `~monaco/deps`, add `~monaco/workers` to `compilerOptions.types` of your `tsconfig`:

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-monaco/client"]
  }
}
```

## License

[MIT](./LICENSE) License © 2025 Yue JIN and Kong Inc.
