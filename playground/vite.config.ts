import { defineConfig } from 'vite'
import monaco from 'vite-plugin-monaco'

export default defineConfig({
  plugins: [
    monaco({
      languages: ['javascript', 'typescript', 'json', 'yaml'],
      features: [
        'bracketMatching',
        'comment',
        'format',
        'hover',
        'placeholderText',
        'suggest',
      ],
      customLanguages: [
        {
          label: 'yaml',
          entry: 'monaco-yaml',
          worker: {
            id: 'monaco-yaml/yamlWorker',
            entry: 'monaco-yaml/yaml.worker',
          },
        },
      ],
    }),
  ],
})
