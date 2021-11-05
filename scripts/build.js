/*
参考vue-next：执行生产环境构建并整合生产d.ts文件

只要传入要构建的包名和格式，就可以构建制定的包（默认为 buildOptions.formats制定的包，或者"esm, cjs"）

```
# 名称支持模糊匹配，如果名字中包括 runtime，则构建所有runtime 相关包:
yarn build runtime

# 制定输出格式
yarn build core --formats cjs
```
*/

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')
const { targets: allTargets, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const targets = args._
const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const prodOnly = !devOnly && (args.prodOnly || args.p)
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildTypes = (args.t || args.types) !== false || isRelease
const buildAllMatching = args.all || args.a
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

const scriptDir = __dirname
const workspaceDir = path.join(__dirname, '..')
const packagesDir = path.join(workspaceDir, 'packages')

run()

async function run() {
  if (isRelease) {
    // 针对发布版本，移除缓存以防止过时类型生成
    await fs.remove(path.resolve(__dirname, '../node_modules/.rts2_cache'))
  }

  await buildAll(fuzzyMatchTarget(targets, buildAllMatching))
  checkAllSizes(fuzzyMatchTarget(targets, buildAllMatching))
}

async function buildAll(targets) {
  await runParallel(require('os').cpus().length, targets, build)
}

async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

async function build(target) {
  const pkgDir = path.resolve(`${packagesDir}/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  // 发布时只构建公开的包
  if (isRelease && pkg.private) {
    return
  }

  // 如果构建特殊格式，则不删除lib文件夹
  if (!formats) {
    await fs.remove(`${pkgDir}/dist`)
  }

  const env = (pkg.buildOptions && pkg.buildOptions.env) || (devOnly ? 'development' : 'production')
  await execa(
    'rollup',
    [
      '--config',
      `${scriptDir}/rollup.config.js`,
      '--environment',
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        `TARGET:${target}`,
        formats ? `FORMATS:${formats}` : ``,
        buildTypes ? `TYPES:true` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )

  if (buildTypes && pkg.types) {
    console.log()
    console.log(chalk.bold(chalk.yellow(`为 ${target} 生成类型文件...`)))

    //  构建类型
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    })

    if (extractorResult.succeeded) {
      // 联接额外的 d.ts 已经打包的 dts
      const typesDir = path.resolve(pkgDir, 'types')
      if (await fs.exists(typesDir)) {
        const dtsPath = path.resolve(pkgDir, pkg.types)
        const existing = await fs.readFile(dtsPath, 'utf-8')
        const typeFiles = await fs.readdir(typesDir)
        const toAdd = await Promise.all(
          typeFiles.map(file => {
            return fs.readFile(path.resolve(typesDir, file), 'utf-8')
          })
        )
        await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
      }
      console.log(chalk.bold(chalk.green(`API Extractor completed successfully.`)))
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`
      )
      process.exitCode = 1
    }

    await fs.remove(`${pkgDir}/dist/packages`)
  }
}

function checkAllSizes(targets) {
  if (devOnly) {
    return
  }
  console.log()
  for (const target of targets) {
    checkSize(target)
  }
  console.log()
}

function checkSize(target) {
  const pkgDir = path.resolve(`${packagesDir}/${target}`)
  checkFileSize(`${pkgDir}/dist/${target}.global.prod.js`)
  checkFileSize(`${pkgDir}/dist/${target}.runtime.global.prod.js`)
}

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return
  }
  const file = fs.readFileSync(filePath)
  const minSize = (file.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(file)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(file)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}
