import type { Plugin } from 'vite'
import type {
  EditorFeature,
  EditorLanguage,
  NegatedEditorFeature,
  IFeatureDefinition,
} from 'monaco-editor/esm/metadata'
import { features, languages } from 'monaco-editor/esm/metadata'

type Options = {
  /**
   * Include only a subset of the languages supported.
   */
  languages?: EditorLanguage[]

  /**
   * Custom languages (outside of the ones shipped with the `monaco-editor`).
   */
  customLanguages?: IFeatureDefinition[]

  /**
   * Include only a subset of the editor features.
   * Use e.g. '!contextmenu' to exclude a certain feature.
   */
  features?: (EditorFeature | NegatedEditorFeature)[]
}

export default function (options?: Options): Plugin {
  const DEPS_ID = '~monaco/deps' as const
  const WORKERS_ID = '~monaco/workers' as const
  const DEPS_RESOLVED_ID = '\0' + DEPS_ID
  const WORKERS_RESOLVED_ID = '\0' + WORKERS_ID

  return {
    name: 'vite-plugin-monaco',
    resolveId(id) {
      if (id === DEPS_ID) {
        return DEPS_RESOLVED_ID
      } else if (id === WORKERS_ID) {
        return WORKERS_RESOLVED_ID
      }
    },
    load(id) {
      if (id === DEPS_RESOLVED_ID) {
        return ``
      } else if (id === WORKERS_RESOLVED_ID) {
        return ``
      }
    },
    config: () => ({
      resolve: {
        alias: [
          {
            find: /^monaco-editor$/,
            replacement: 'monaco-editor/esm/vs/editor/editor.api',
          },
        ],
      },
    }),
  }
}
