/**
 * 返回数组最后一个元素
 * @param array 数组
 * @param n 倒数第几个元素（默认0）
 */
export function arrayTail<T>(array: ArrayLike<T>, n: number = 0): T {
  return array[array.length - (1 + n)]
}

/**
 * 判断两个数组是否相等
 * @param one
 * @param other
 * @param itemEquals
 * @returns
 */
export function arrayEquals<T>(
  one: ReadonlyArray<T> | undefined,
  other: ReadonlyArray<T> | undefined,
  itemEquals: (a: T, b: T) => boolean = (a, b) => a === b
): boolean {
  if (one === other) {
    return true
  }

  if (!one || !other) {
    return false
  }

  if (one.length !== other.length) {
    return false
  }

  for (let i = 0, len = one.length; i < len; i++) {
    if (!itemEquals(one[i], other[i])) {
      return false
    }
  }

  return true
}

/**
 * 从数组中移除指定元素
 */
export function arrayRemove<T>(array: T[], element: T): T | undefined {
  const index = array.indexOf(element)
  if (index > -1) {
    array.splice(index, 1)

    return element
  }

  return undefined
}

/**
 * 向指定的数组的指定位置插入一个数组
 */
export function arrayInsert<T>(target: T[], insertIndex: number, insertArr: T[]): T[] {
  const before = target.slice(0, insertIndex)
  const after = target.slice(insertIndex)
  return before.concat(insertArr, after)
}

/**
 * 如果指定的元素存在数组中，则将其移到数组首位，
 */
export function pushToStart<T>(arr: T[], value: T): void {
  const index = arr.indexOf(value)

  if (index > -1) {
    arr.splice(index, 1)
    arr.unshift(value)
  }
}

/**
 * 如果指定的元素存在数组中，则将其移到数组末尾
 */
export function pushToEnd<T>(arr: T[], value: T): void {
  const index = arr.indexOf(value)

  if (index > -1) {
    arr.splice(index, 1)
    arr.push(value)
  }
}

/** 将指定的元素转换为数组 */

export function asArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [x]
}

/**
 * 返回数组
 * @param items 为数组返回原值，为空则空数组，否则返回目标为唯一项的数组
 */
export function ensureArray<T>(items: Array<T | null | undefined> | T | null | undefined): T[] {
  if (Array.isArray(items)) {
    return items.filter(Boolean) as T[]
  }
  if (items || (typeof items === 'number' && items === 0)) {
    return [items]
  }
  return []
}

/**
 * 将对象转换为数组，并将对象的key转换为
 * @param obj 目标对象
 * @param retriever 获取数组对象的方法
 * @returns
 */
export function objectToArray<T = any, E = any>(
  obj: Record<string, E>,
  retriever?: (item: E, key: string, obj: Record<string, E>) => T
): (T | undefined | null)[] {
  if (!obj) return []

  const items = Object.keys(obj).map(key => {
    let it: any = obj[key]
    if (retriever) {
      it = retriever(obj[key], key, obj)
    }

    return it
  })

  return items
}

/**
 * 数组转换为对象
 * @param arr 目标数组
 * @param keyProp 对象key
 * @returns
 */
export function arrayToObject<T = any>(arr: T[], keyProp: string): Record<string, T> {
  if (!arr?.length) return {}

  const obj: Record<string, T> = arr.reduce((pre: Record<string, T>, cur: T) => {
    if (cur) {
      const key: string = (cur as any)[keyProp]
      if (key) pre[key] = cur
    }

    return pre
  }, {})

  return obj
}

/**
 * 查找目标key
 */
export function findBy<T = unknown>(items: T[] | undefined | null, key: string, val: unknown): T | undefined {
  if (!items || !items.length) return undefined

  const result = items.find(item => {
    if (!item) return false
    return (item as any)[key] === val
  })

  return result
}

/**
 * 根据目标key进行排序，排序将产生新的数组
 */
export function sortBy<T = unknown>(
  items: unknown[] | undefined | null,
  sortKey: string,
  options?: number | { sortOrder?: number | null; defaultValue?: unknown }
): T[] {
  if (!items || !items.length) return []

  let opts: any = { sortOrder: 1, defaultValue: undefined }

  if (typeof options === 'number') {
    opts = { sortOrder: options }
  } else {
    opts = Object.assign(opts, options)
  }

  const sortOrder = opts.sortOrder || 1
  const defaultValue = opts.defaultValue

  const _items = [...items]

  _items.sort((a: any, b: any) => {
    const av = !a || a[sortKey] === undefined ? defaultValue : a[sortKey]
    const bv = !b || b[sortKey] === undefined ? defaultValue : b[sortKey]

    if (av === bv) return 0
    if (!av) return -1 * sortOrder // 升序时，不存在则默认往后拍，降序相反
    if (!bv) return 1 * sortOrder // 同上
    return (av > bv ? 1 : -1) * sortOrder
  })

  return _items as T[]
}
