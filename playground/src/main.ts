import monaco from 'monaco-editor'
import { configureMonacoYaml } from 'monaco-yaml'

// monaco.editor.create(document.getElementById('container')!, {
//   value: 'console.log("Hello, world")',
//   language: 'javascript',
// })

// configureMonacoYaml(monaco, {
//   enableSchemaRequest: true,
//   schemas: [
//     {
//       fileMatch: ['*'],
//       uri: 'https://json.schemastore.org/prettierrc.json',
//     },
//   ],
// })

configureMonacoYaml(monaco)

monaco.editor.create(document.getElementById('container')!, {
  value: 'semi: false',
  language: 'yaml',
})
