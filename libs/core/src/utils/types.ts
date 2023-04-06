export { INFINITY, MAX_SAFE_INTEGER } from './_internal/base'

const _hasOwnProperty = Object.prototype.hasOwnProperty

/** 无操作 */
export const noop = (): void => {}

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)

// 是否Boolean类型
export function isBoolean(obj: any): obj is boolean {
  return obj === true || obj === false
}

export const isFunction = (val: any): val is Function => typeof val === 'function'

export const isString = (val: any): val is string => typeof val === 'string'

/**
 * 是否提供的参数是数字类型，且不等于NaN
 */
export function isNumber(obj: any): obj is number {
  return typeof obj === 'number' && !isNaN(obj)
}

export const isNull = (val: any): val is null => val === null

export const isUndefined = (val: any): val is undefined => typeof val === 'undefined'

/** 未定义或null */
export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null

/** 非Nil */
export function isNotNil<T>(arg: T | null | undefined): arg is T {
  return !isNil(arg)
}

export const isSymbol = (val: any): val is symbol => typeof val === 'symbol'

/**
 * 是否参数为数组
 */
export function isArray<T>(
  array: T | {}
): array is T extends readonly any[] ? (unknown extends T ? never : readonly any[]) : any[] {
  return Array.isArray(array)
}

/**
 * 是否参数为object且不为 `null`, `array`, `regexp`, 或`date`.
 */
export function isObject(obj: any): obj is Object {
  return (
    typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp) && !(obj instanceof Date)
  )
}

// 数组是否为空
export const isEmptyArray = (o: unknown): boolean => Array.isArray(o) && !o.length

// 是否为空对象 如：{}, new Object()

export function isEmptyObject(obj: any): obj is any {
  if (!isObject(obj)) {
    return false
  }

  for (let key in obj) {
    if (_hasOwnProperty.call(obj, key)) {
      return false
    }
  }

  return true
}

export const isPlainObject = (fn: any): fn is object => {
  if (!isObject(fn)) return false

  const proto = Object.getPrototypeOf(fn)
  if (proto === null) return true

  const ctor = _hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  )
}

// 目标是否普通对象或数组
export const isPlainObjectOrArray = (o: any): boolean => {
  if (!Array.isArray(o)) return isPlainObject(o)
  return o.every(it => isPlainObject(it))
}

/**
 * 判断目标是否为空
 * @param o
 * @param options
 *  zero: 0为空
 *  blank: 空字符串为空
 * @returns
 */
export const isEmpty = (
  o: unknown,
  options: {
    blank?: boolean // 默认为true
    zero?: boolean // 默认为false
    zeroStr?: boolean // 默认为false
    trimBlank?: boolean // 默认为false
    emptyArray?: boolean // 默认为false
    emptyObject?: boolean // 默认为false
  } = {}
): boolean => {
  return (
    isNil(o) ||
    (options.blank !== false && o === '') ||
    (options.zero === true && o === 0) ||
    (options.zeroStr === true && o === '0') ||
    (options.trimBlank === true && String(o).trim() === '') ||
    (options.emptyArray === true && isEmptyArray(o)) ||
    (options.emptyObject === true && isEmptyObject(o))
  )
}
