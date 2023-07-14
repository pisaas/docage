import { rollup } from 'rollup';

import type { RollupOptions, OutputOptions, RollupBuild } from 'rollup';

/** 打包 */
export function bundle(options: Partial<RollupOptions>) {
  return rollup(options);
}

/** 获取打包选项 */
export function getBundleOptions(
  options: Partial<RollupOptions>,
  exOptions: {
    minify?: boolean;
    rollup?: any;
  }
) {
  // const exRollupConfig = exOptions.rollup || {};
  // const pluginsConfig = exRollupConfig.plugins || {};
  // const esbuildConfig = { target: 'chrome58', minify: exOptions.minify === true, ...pluginsConfig.esbuild };
  // const replaceConfig = { ...pluginsConfig.replace };
  // const rollupConfig: RollupOptions = {
  //   plugins: [
  //     nodeResolve({
  //       extensions: ['.mjs', '.js', '.json', '.ts']
  //     }),
  //     replace(replaceConfig),
  //     commonjs(),
  //     esbuild(esbuildConfig),
  //     filesize({ reporter })
  //   ],
  //   treeshake: false,
  //   ...options
  // };
  // return rollupConfig;
}

/** 写文件 */
export function output(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)));
}
