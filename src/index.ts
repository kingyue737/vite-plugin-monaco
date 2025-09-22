import type { Plugin } from 'vite'
import type {
  EditorFeature,
  EditorLanguage,
  NegatedEditorFeature,
  IFeatureDefinition,
} from 'monaco-editor/esm/metadata.js'
import { features, languages } from 'monaco-editor/esm/metadata.js'

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
  const VIRTUAL_ID = '\0virtual:monaco-editor'

  return {
    name: 'vite-plugin-monaco',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'monaco-editor') {
        return VIRTUAL_ID
      }
    },
    load(id) {
      if (id === VIRTUAL_ID) {
        const languagesDict = Object.fromEntries(
          languages.map((lang) => [lang.label, lang]),
        )
        const featuresDict = Object.fromEntries(
          features.map((feat) => [feat.label, feat]),
        )
        const allFeatureIds = Object.keys(featuresDict)
        let featuresIds: string[] = []

        if (options?.features) {
          const excludedFeatures = options.features
            .filter((f) => f.startsWith('!'))
            .map((f) => f.slice(1))
          if (excludedFeatures.length) {
            featuresIds = allFeatureIds.filter(
              (f) => !excludedFeatures.includes(f),
            )
          } else {
            featuresIds = options.features
          }
        } else {
          featuresIds = allFeatureIds
        }

        const featureImports = featuresIds.flatMap((f) => {
          const entry = featuresDict[f].entry
          const arr = Array.isArray(entry) ? entry : [entry]
          return arr.map((e) => `import 'monaco-editor/esm/${e}'`)
        })

        const languageIds = options?.languages || Object.keys(languagesDict)
        const languageImports = languageIds.flatMap((lang) => {
          const entry = languagesDict[lang].entry
          const arr = Array.isArray(entry) ? entry : [entry]
          return arr.map((e) => `import 'monaco-editor/esm/${e}'`)
        })

        const workerPaths = Object.fromEntries(
          languages
            .filter((lang) => lang.worker)
            .map(({ label, worker }) => [label, worker!.entry!]),
        )
        if (workerPaths['typescript']) {
          // javascript shares the same worker
          workerPaths['javascript'] = workerPaths['typescript']
        }
        if (workerPaths['css']) {
          // scss and less share the same worker
          workerPaths['less'] = workerPaths['css']
          workerPaths['scss'] = workerPaths['css']
        }

        if (workerPaths['html']) {
          // handlebars, razor and html share the same worker
          workerPaths['handlebars'] = workerPaths['html']
          workerPaths['razor'] = workerPaths['html']
        }

        const workerImports: string[] = []
        const workerAssignments: string[] = []
        languageIds.forEach((lang) => {
          const entry = workerPaths[lang]
          if (!entry) return
          const workerVar = `${lang}Worker`
          workerImports.push(
            `import ${workerVar} from 'monaco-editor/esm/${entry}?worker'`,
          )
          workerAssignments.push(`workers['${lang}'] ??= ${workerVar}`)
        })

        options?.customLanguages?.forEach(({ label, entry, worker }) => {
          languageImports.push(`import '${entry}'`)
          if (worker) {
            const workerVar = `${label}Worker`
            workerImports.push(
              `import ${workerVar} from '${worker.entry}?worker'`,
            )
            workerAssignments.push(`workers['${label}'] ??= ${workerVar}`)
          }
        })

        const globalScript = `
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
self.MonacoEnvironment ??= {
  _workers: {},
  getWorker: function (_, label) {
    const worker = this._workers[label] ?? EditorWorker
    return new worker()
  },
}
const workers = self.MonacoEnvironment._workers
`

        return [
          "import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'",
          ...featureImports,
          ...languageImports,
          ...workerImports,
          globalScript,
          ...workerAssignments,
          "export * from 'monaco-editor/esm/vs/editor/editor.api'",
          'export default monaco',
        ].join('\n')
      }
    },
  }
}
