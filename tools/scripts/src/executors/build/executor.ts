import type { ExecutorContext } from '@nx/devkit';
import { DocageProjectType } from '@docage/devkit';
import { deepmerge } from '../../utils';

import { BuildExecutorSchema } from './schema';
import { buildLib } from './tasks';

/** 默认值 */
export const defaultExecutorOptions: Partial<BuildExecutorSchema> = {
  type: DocageProjectType.LIBRARY,
  format: ['esm', 'cjs']
};

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  const mergedOptions = deepmerge<BuildExecutorSchema>(defaultExecutorOptions, options);

  await runTask(mergedOptions, context);

  // console.log('Executor ran for Build', options);

  return {
    success: true
  };
}

/** 执行任务 */
async function runTask(options: BuildExecutorSchema, context: ExecutorContext) {
  switch (options.type) {
    case DocageProjectType.LIBRARY:
      await buildLib(options, context);
      break;
  }
}
