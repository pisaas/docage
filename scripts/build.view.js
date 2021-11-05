const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')

if (!process.env.TARGET) {
  process.env.TARGET = process.argv[2]
}

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const packagesDir = path.resolve(__dirname, '..', 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)

const pkg = require('../package.json')
const deps = Object.keys(pkg.dependencies)
const entryFile = `src/index.ts`

const runBuild = async () => {
  const inputOptions = {
    input: resolve(entryFile),
    plugins: [
      nodeResolve(),
      vue({
        target: 'browser',
        css: false
      })
      // typescript({
      //   tsconfigOverride: {
      //     compilerOptions: {
      //       declaration: false
      //     },
      //     exclude: ['node_modules', '__tests__']
      //   },
      //   abortOnError: false
      // })
    ],
    external(id) {
      return (
        /^vue/.test(id) || /^@element-plus/.test(id) || deps.some(k => new RegExp('^' + k).test(id))
      )
    }
  }

  const outOptions = {
    format: 'es',
    file: `dist/docage-element-plus.js`
  }

  const bundle = await rollup.rollup(inputOptions)

  await bundle.write(outOptions)
}

runBuild()
