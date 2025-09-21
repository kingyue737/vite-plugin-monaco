import type { Plugin } from 'vite'

type Options = {}

export default function (
  options?: Options,
): Plugin {
  const virtualModuleId = 'virtual:supported-browsers'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-monaco',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return ``
      }
    },
  }
}
