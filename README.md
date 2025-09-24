# vite-plugin-monaco (Draft)

[![npm version](https://img.shields.io/npm/v/vite-plugin-monaco)](https://www.npmjs.com/package/vite-plugin-monaco)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-monaco)](https://www.npmjs.com/package/vite-plugin-monaco)

A plugin to simplify loading the [Monaco Editor](https://github.com/microsoft/monaco-editor) with [Vite](https://vite.dev/).

## Install

```sh
npm i -D vite-plugin-monaco
```

## Usage

- Vite config:

```ts
import { defineConfig } from 'vite'
import monaco from 'vite-plugin-monaco'

export default defineConfig({
  plugins: [monaco({})],
})
```

- Runtime code:

```ts
import monaco from 'monaco-editor'

monaco.editor.create(document.getElementById('container'), {
  value: 'console.log("Hello, world")',
  language: 'javascript',
})
```

## Options

Options can be passed in to `vite-plugin-monaco`. They can be used to generate a smaller editor bundle by selecting only certain languages or only certain editor features:

- `languages` (`string[]`) - include only a subset of the languages supported. By default, all languages shipped with the `monaco-editor` will be included.

  Some languages share the same web worker. If one of the following languages is included, you must also include the language responsible for instantiating their shared worker:

  | Language   | Instantiator |
  | ---------- | ------------ |
  | javascript | typescript   |
  | handlebars | html         |
  | scss, less | css          |

- `features` (`string[]`) - include only a subset of the editor features. By default, all features shipped with the `monaco-editor` will be included. Instead of enumerating included features, it is also possible to exclude certain default features prefixing them with an exclamation mark '!'.

- `customLanguages` (`{label:string; entry:string; worker:{id:string, entry:string} }[]`) - Incorporate with 3rd party language worker.

## License

[MIT](./LICENSE) License © 2025 Yue JIN and Kong Inc.
