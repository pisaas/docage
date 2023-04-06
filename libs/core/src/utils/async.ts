import type { GenericFunction, Thenable } from '@docage/contract'

export function isThenable<T>(obj: any): obj is Promise<T> {
  return obj && typeof (<Promise<any>>obj).then === 'function'
}

export function asPromise<T>(callback: () => T | Thenable<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const item = callback()
    if (isThenable<T>(item)) {
      item.then(resolve, reject)
    } else {
      resolve(item)
    }
  })
}

/**
 * 延时时间
 * @param seconds
 * @returns
 */
export async function delay<T>(fn: GenericFunction | number, milliseconds = 1): Promise<T> {
  if (typeof fn === 'number') {
    milliseconds = fn
    // @ts-ignore
    fn = undefined
  }

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      Promise.resolve()
        .then(() => {
          if (typeof fn === 'function') return fn.call(undefined)
          return
        })
        .then(result => {
          resolve(result as T)
        })
        .catch(err => {
          reject(err)
        })
    }, milliseconds)
  })
}
