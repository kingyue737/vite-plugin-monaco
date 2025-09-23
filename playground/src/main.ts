import monaco from 'monaco-editor'
import { configureMonacoYaml } from 'monaco-yaml'

configureMonacoYaml(monaco, {
  enableSchemaRequest: true,
  schemas: [
    {
      fileMatch: ['*'],
      uri: 'https://json.schemastore.org/prettierrc.json',
    },
  ],
})

monaco.editor.create(document.getElementById('container')!, {
  value: 'semi: false',
  language: 'yaml',
})
