import { isEmpty, isNil, isObject, isPlainObject, isString } from './types'
import { deepmergeAll } from './_internal/deepmerge'
import { baseGet, baseSet, baseUnset } from './_internal/base'

import type { GenericFunction } from '@docage/contract'
import type { DeepmergeOptions } from './_internal/deepmerge'

const _hasOwnProperty = Object.prototype.hasOwnProperty

export function deepFreeze<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  const stack: any[] = [obj]
  while (stack.length > 0) {
    const obj = stack.shift()
    Object.freeze(obj)
    for (const key in obj) {
      if (_hasOwnProperty.call(obj, key)) {
        const prop = obj[key]
        if (typeof prop === 'object' && !Object.isFrozen(prop)) {
          stack.push(prop)
        }
      }
    }
  }
  return obj
}

/** 深度处理目标对象，支持循环引用，返回处理结果（新的对象） */
export function deepProcess(obj: any, process: GenericFunction, cache: any[] = []): any {
  if (!obj || typeof obj !== 'object') return process(obj)

  // 处理日期
  if (obj instanceof Date) {
    const dt = new Date()
    dt.setTime(obj.getTime())
    return process(dt)
  }

  // 处理正则
  if (obj instanceof RegExp) {
    const reg = new RegExp(obj.source, obj.flags)
    return process(reg)
  }

  // 如果obj命中，则当前为循环引用
  const hit = cache.find(c => c.original === obj)
  if (hit) return hit.copy

  const copy: any = Array.isArray(obj) ? [] : {}

  // 将copy放入缓存以备后续检查循环引用
  cache.push({ original: obj, copy })

  Object.keys(obj).forEach(key => {
    copy[key] = deepProcess(obj[key], process, cache)
  })

  return copy
}

/** 深度克隆，并支持循环引用 */
export function deepClone(obj: any): any {
  return deepProcess(obj, (val: any) => val)
}

/**
 * 深度比较两个对象是否相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function deepEquals(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = obj1[key]
    const val2 = obj2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if ((areObjects && !deepEquals(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

/**
 * 浅度比较对象是否相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function shallowEquals(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}

/** 深度trim，并支持循环引用 */
export function deepTrim(obj: any): any {
  return deepProcess(obj, (val: any) => {
    if (isString(val)) return val.trim()
    return val
  })
}

/** 浅trim，并支持循环引用 */
export function shallowTrim(obj: any): any {
  if (isString(obj)) return obj.trim()
  if (!obj || !isObject(obj)) return obj

  const trimed = Object.keys(obj).reduce((acc, key) => {
    acc[key] = isString(obj[key]) ? obj[key].trim() : obj[key]
    return acc
  }, {} as any)

  return trimed
}

/** 默认深度合并对象判断 */
export function isDeepMergeableObject(o: any): boolean {
  return Array.isArray(o) || isPlainObject(o)
}

/**
 * 深度合并，合并后会产生新的对象，排序靠后的会合并考前的对象
 * @param args 被和并的对象
 */
export function deepMerge(...args: any[]): any {
  const items = args.filter(it => !isNil(it))
  return deepmergeAll(items, {
    isMergeableObject: isDeepMergeableObject
  })
}

/**
 * 深度合并，合并后会产生新的对象，排序靠后的会合并考前的对象
 * @param args 被和并的对象，合并对象数组
 * @param options 支持合并选项
 */
export function deepMerge2(args: any[], options?: DeepmergeOptions): any {
  const items = args.filter(it => !isNil(it))

  const opts = {
    isMergeableObject: isDeepMergeableObject,
    ...options
  }

  return deepmergeAll(items, opts)
}

/** 获取指定路径对象值 */
export function get(object: unknown, path: string | string[], defaultValue?: unknown) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}

/** 设置指定对象路径值 */
export function set(object: unknown, path: string | string[], value: unknown, customizer?: GenericFunction) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return object == null ? object : baseSet(object, path, value, customizer)
}

/** 移除对象指定路径值 */
export function unset(object: unknown, path: string | string[]) {
  return object == null ? true : baseUnset(object, path)
}

export type OmitFilterFn = (val: any, key: string, object: unknown) => boolean

/**
 * @param object 需要移除属性的对象
 * @param props 需要移除的属性
 * @param filter 过滤方法，返回true则保留，否则排除
 */
export function omit(object: any, props?: string | string[] | OmitFilterFn, filter?: OmitFilterFn): any {
  if (typeof props === 'string') {
    props = [props]
  } else if (typeof props === 'function') {
    filter = props
    props = []
  }

  if (!isObject(object)) return {}

  const isFunction = typeof filter === 'function'
  const keys = Object.keys(object)
  const res: any = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const val = object[key]

    if (!props || (!props.includes(key) && (!isFunction || filter?.(val, key, object)))) {
      res[key] = val
    }
  }
  return res
}

/**
 * 过滤对象所有为Nil的属性
 * @param object 需要移除属性的对象
 */
export function omitNil(object: unknown): any {
  return omit(object, val => !isNil(val))
}

/**
 * 过滤对象所有为Empty的属性
 * @param object 需要移除属性的对象
 */
export function omitEmpty(object: unknown): any {
  return omit(object, val => !isEmpty(val))
}

/**
 * 简单的从目标中选取指定选项生成新的对象
 * @param source
 * @param keys
 * @returns
 */
export function pick(source: any, ...keys: string[]): any {
  return keys.reduce((result: { [key: string]: any }, key) => {
    if (source[key] !== undefined) {
      result[key] = source[key]
    }

    return result
  }, {})
}

/**
 * 转换对象为可编译二维数组
 * @param obj
 * @returns
 */
export function entries<T>(obj: Record<string, T>): Array<[string, T]> {
  return Object.keys(obj).map((key: string) => [key, obj[key]])
}

// 根据key设置对象类型
/** 参数1为要设置的数据; 参数3为唯一标识属性，或设置方法; 参数4为忽略的prop */
export function setObjectsByKeys(targets: any[], items: any[], keyProp: string, setFn?: Function) {
  if (!items || !items.length) return

  // 获取data中所有有key的值
  let itemKeys = items.filter(it => it && it[keyProp])
  // 获取list中所有有key的行
  let keyTargets = targets.filter(it => it && it[keyProp])

  itemKeys.forEach((it: any) => {
    if (!it[keyProp]) return

    let targetItem = keyTargets.find(_it => it[keyProp] == _it[keyProp])

    if (targetItem) {
      if (setFn) {
        setFn(targetItem, it)
      } else {
        writeObject(targetItem, it, true)
      }
    } else {
      targets.push(it)
    }
  })
}

/**
 * 将第二个的对象的值给第一个对象,
 * isFull: 是否完整复制
 */
export function writeObject(writeObj: any, readObj: any, isFull?: boolean) {
  if (isNil(writeObj)) writeObj = {}

  if (!isObject(readObj) || !isObject(writeObj)) return writeObj

  Object.keys(writeObj).forEach((key: any) => {
    if (readObj.hasOwnProperty(key)) {
      writeObj[key] = readObj[key]
    }
  })

  // 完整复制
  if (isFull === true) {
    Object.keys(readObj).forEach((key: any) => {
      if (readObj.hasOwnProperty(key)) {
        writeObj[key] = readObj[key]
      }
    })
  }

  return writeObj
}
