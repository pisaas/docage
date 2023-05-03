import { resolve } from 'path';

export { resolve };

/** 工作区路径 */
export const workspaceRoot = resolve(__dirname, '..', '..', '..', '..');

/** packages路径 */
export const packagesRoot = resolve(workspaceRoot, 'packages');

/** 获取相对于workspace路径 */
export function resolveProjectPath(...paths: string[]) {
  return resolve(workspaceRoot, ...paths);
}

/** 获取package路径 */
export function resolvePackageDir(name: string) {
  return resolve(packagesRoot, name);
}
