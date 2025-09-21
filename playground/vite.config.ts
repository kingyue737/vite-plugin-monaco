import { defineConfig } from 'vite'
import SupportedBrowsers from 'vite-plugin-monaco'

export default defineConfig({
  plugins: [SupportedBrowsers(/* options */)],
})
