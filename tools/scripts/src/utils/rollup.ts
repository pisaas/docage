import { rollup } from 'rollup';

import type { RollupOptions, OutputOptions, RollupBuild } from 'rollup';

/** 打包 */
export function bundle(options: RollupOptions) {
  return rollup(options);
}

/** 写文件 */
export function output(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)));
}
