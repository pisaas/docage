import type { ExecutorContext } from '@nx/devkit';

import { BuildExecutorSchema } from '../schema';
import { paths, rollup } from '../../../utils';

/** 构建 */
export async function buildLib(options: BuildExecutorSchema, context: ExecutorContext) {
  const name = options.name || context.projectName;
  const entry = paths.resolve(context.root, options.main);
  const outputPath = paths.resolve(context.root, options.outputPath);

  console.log('options:', options);
  console.log('entry:', entry);
  console.log('outDir:', outputPath);

  await rollup.bundle({
    input: entry
    // entryFileName: entry

    // build: {
    //   minify: true,
    //   outDir: outputPath,
    //   lib: {
    //     entry,
    //     name: options.name || context.projectName,
    //     formats: options.format as any,
    //     fileName: (format: string, entryName: string) => {
    //       return `${name}-${format}.js`;
    //     }
    //   }
    // }
  });
}
