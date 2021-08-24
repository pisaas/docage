// 获取对象tag
export function getTag(value: unknown) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

// 目标是否为null
export const isNull = (o: any) => getTag(o) === '[object Null]'

// 目标是否为undefined
export const isUndefined = (o: any) => getTag(o) === '[object Undefined]'

// 目标为null or undefined
export const isNil = (o: any) => isNull(o) || isUndefined(o)

// 目标是否对象
export const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object'

export type OmitFilterFn = (val: any, key: string, object: unknown) => boolean

/**
 * @param object 需要移除属性的对象
 * @param props 需要移除的属性
 * @param filter 过滤方法，返回true则保留，否则排除
 */
export function omit(
  object: unknown,
  props?: string | string[] | OmitFilterFn,
  filter?: OmitFilterFn
): any {
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
    const val = (object as any)[key]

    if (
      !props ||
      (props.indexOf(key) === -1 && (!isFunction || (filter && filter(val, key, object))))
    ) {
      res[key] = val
    }
  }
  return res
}
