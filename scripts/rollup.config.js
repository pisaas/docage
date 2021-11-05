/**
 * 此构建代码参考vue-next
 */

// @ts-check
import path from 'path'
import ts2 from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'

import vue from 'rollup-plugin-vue'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const masterVersion = require('../package.json').version
const packagesDir = path.resolve(__dirname, '..', 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename || path.basename(packageDir)

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  }
}

const defaultFormats = ['esm-bundler', 'cjs']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = process.env.PROD_ONLY
  ? []
  : packageFormats.map(format => createConfig(format, outputConfigs[format]))

if (process.env.NODE_ENV === 'production') {
  packageFormats.forEach(format => {
    if (packageOptions.prod === false) {
      return
    }
    if (format === 'cjs') {
      packageConfigs.push(createProductionConfig(format))
    }
    if (/^(global|esm-browser)/.test(format)) {
      packageConfigs.push(createMinifiedConfig(format))
    }
  })
}

export default packageConfigs

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  output.exports = 'auto'
  output.sourcemap = !!process.env.SOURCE_MAP
  output.externalLiveBindings = false

  const isProductionBuild = process.env.__DEV__ === 'false' || /\.prod\.js$/.test(output.file)
  const isBundlerESMBuild = /esm-bundler/.test(format)
  const isBrowserESMBuild = /esm-browser/.test(format)
  const isNodeBuild = format === 'cjs'
  const isGlobalBuild = /global/.test(format)
  const isBrowserBuild =
    (isGlobalBuild || isBrowserESMBuild || isBundlerESMBuild) &&
    !packageOptions.enableNonBrowserBranches

  if (isGlobalBuild) {
    output.name = packageOptions.name
  }

  const shouldEmitDeclarations = pkg.types && process.env.TYPES != null && !hasTSChecked

  const ts2Plugin = ts2({
    check: process.env.NODE_ENV === 'production' && !hasTSChecked,
    tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, '..', 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  })
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  let entryFile = `src/index.ts`

  let aliasEntries = []

  let external = []
  let globals = {}

  if (isGlobalBuild || isBrowserESMBuild) {
    if (!packageOptions.enableNonBrowserBranches) {
      // normal browser builds - non-browser only imports are tree-shaken,
      // they are only listed here to suppress warnings.
      external = ['source-map', '@babel/parser', 'estree-walker']
    } else {
      aliasEntries = [...aliasEntries]
    }

    external = [...external, 'vue', 'vuex']
    globals = {
      // @ts-ignore
      vue: 'Vue',
      vuex: 'Vuex'
    }
  } else {
    external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
  }

  output.globals = globals

  const nodePlugins =
    packageOptions.enableNonBrowserBranches && format !== 'cjs'
      ? [
          // @ts-ignore
          // require('@rollup/plugin-commonjs')({ sourceMap: false }),
          // @ts-ignore
          require('rollup-plugin-polyfill-node')(),
          require('@rollup/plugin-node-resolve').nodeResolve()
        ]
      : []

  const vuePlugins = createVuePlugins(packageOptions)

  return {
    input: resolve(entryFile),
    output,
    external,
    plugins: [
      json({
        namedExports: false
      }),
      ts2Plugin,
      [...vuePlugins],
      createReplacePlugin(
        isProductionBuild,
        isBundlerESMBuild,
        isBrowserESMBuild,
        isBrowserBuild,
        isGlobalBuild,
        isNodeBuild
      ),
      alias({
        entries: aliasEntries
      }),
      ...nodePlugins,
      ...plugins
    ],
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    treeshake: {
      moduleSideEffects: false
    }
  }
}

function createVuePlugins(packageOptions = {}) {
  const packageVueOptions = packageOptions.vue

  if (!packageVueOptions) return []

  let vuePlugins = []

  // preVue
  const preVue = [
    alias({
      entries: [
        {
          find: '@',
          replacement: `${path.resolve(packageDir, 'src')}`
        }
      ],
      // @ts-ignore
      customResolver: nodeResolve({
        extensions: ['.js', '.jsx', '.vue']
      })
    })
  ]

  // vue
  let vueOptions = {
    target: 'browser',
    preprocessStyles: true
  }

  if (typeof packageVueOptions === 'object') {
    vueOptions = {
      ...vueOptions,
      ...packageVueOptions
    }
  }

  // @ts-ignore
  const vuePlugin = vue({ ...vueOptions })
  vuePlugins.push(vuePlugin)

  vuePlugins = [...preVue, vuePlugin]

  return vuePlugins
}

function createReplacePlugin(
  isProduction,
  isBundlerESMBuild,
  isBrowserESMBuild,
  isBrowserBuild,
  isGlobalBuild,
  isNodeBuild
) {
  const replacements = {
    __COMMIT__: `"${process.env.COMMIT}"`,
    __VERSION__: `"${masterVersion}"`,
    __DEV__: isBundlerESMBuild
      ? // preserve to be handled by bundlers
        `(process.env.NODE_ENV !== 'production')`
      : // hard coded dev/prod builds
        !isProduction,
    // this is only used during Vue's internal tests
    __TEST__: false,
    // If the build is expected to run directly in the browser (global / esm builds)
    __BROWSER__: isBrowserBuild,
    __GLOBAL__: isGlobalBuild,
    // If the build is expected to run directly in the browser (global / esm builds)
    __ESM_BUNDLER__: isBundlerESMBuild,
    __ESM_BROWSER__: isBrowserESMBuild,
    // is targeting Node (SSR)?
    __NODE_JS__: isNodeBuild,

    __VUE_OPTIONS_API__: isBundlerESMBuild ? `__VUE_OPTIONS_API__` : true,
    __VUE_PROD_DEVTOOLS__: isBundlerESMBuild ? `__VUE_PROD_DEVTOOLS__` : false
  }
  // allow inline overrides like
  //__RUNTIME_COMPILE__=true yarn build runtime-core
  Object.keys(replacements).forEach(key => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace({
    // @ts-ignore
    values: replacements,
    preventAssignment: true
  })
}

function createProductionConfig(format) {
  return createConfig(format, {
    file: resolve(`dist/${name}.${format}.prod.js`),
    format: outputConfigs[format].format
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: outputConfigs[format].file.replace(/\.js$/, '.prod.js'),
      format: outputConfigs[format].format
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true
        },
        safari10: true
      })
    ]
  )
}
