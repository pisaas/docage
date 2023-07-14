import type { ExecutorContext } from '@nx/devkit';

// import * as vite from 'vite';

import { paths } from '../../../utils';
import { BuildExecutorSchema } from '../schema';

/** 构建 */
export async function buildLib(options: BuildExecutorSchema, context: ExecutorContext) {
  const name = options.name || context.projectName;
  const entry = paths.resolve(context.root, options.main);
  const outputPath = paths.resolve(context.root, options.outputPath);

  console.log('options:', options);
  console.log('entry:', entry);
  console.log('outDir:', outputPath);

  // await vite.build({
  //   build: {
  //     minify: true,
  //     outDir: outputPath,
  //     lib: {
  //       entry,
  //       name: options.name || context.projectName,
  //       formats: options.format as any,
  //       fileName: (format: string, entryName: string) => {
  //         return `${name}-${format}.js`;
  //       }
  //     },
  //     rollupOptions: {}
  //   }
  // });
}
