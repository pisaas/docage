import * as _deepmerge from 'deepmerge';

/** 批量合并 */
export function deepmerge<T>(...objects: any[]): T {
  return _deepmerge.all(objects, {
    // 数组采取覆盖方式
    arrayMerge: (destinationArray, sourceArray, options) => sourceArray
  }) as T;
}
