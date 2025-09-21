import { defineConfig } from 'vite'
import monaco from 'vite-plugin-monaco'

export default defineConfig({
  plugins: [
    monaco({
      languages: ['javascript', 'typescript', 'json'],
      features: [
        'bracketMatching',
        'comment',
        'format',
        'hover',
        'placeholderText',
        'suggest',
      ],
    }),
  ],
})
