import type { ExecutorContext } from '@nx/devkit';
import { ProjectType } from '@docage/devkit';
import { deepmerge } from '../../utils';

import { BuildExecutorSchema } from './schema';
import { buildLib } from './tasks';

/** 默认值 */
export const defaultExecutorOptions = {
  type: ProjectType.LIBRARY,
  format: ['esm', 'cjs']
} as const;

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
    case ProjectType.LIBRARY:
      await buildLib(options, context);
      break;
  }
}
