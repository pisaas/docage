import { BuildExecutorSchema } from './schema';
import executor from './executor';
import { paths } from '../../utils';

describe('Build Executor', () => {
  it('run common build', async () => {
    const name = 'common';

    const output = await executor(
      {
        name,
        outputPath: `dist/packages/${name}`,
        main: `packages/${name}/src/index.ts`,
        tsConfig: `packages/${name}/tsconfig.lib.json`,
        format: ['esm', 'cjs']
      },
      {
        root: paths.workspaceRoot,
        isVerbose: true,
        cwd: paths.resolvePackageDir(name)
      }
    );

    expect(output.success).toBe(true);
  });
});
