/**
 * 自定义全局类型
 */
export type Nil = undefined | null

// 日期值类型
export type DateValue = Date | string | number

/**
 * 通用方法
 */
export type GenericFunction<T = any> = (...args: any[]) => T

/**
 * Promise方法
 */
export type PromiseFunction<T = any> = GenericFunction<Promise<T>>

// 数据比对对象
export type SortCompareFunction<T = any> = (a: T, b: T) => number

// 递归的Partial
export type DeepPartial<T> = {
  // 如果是 object，则递归类型
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}

export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends GenericFunction ? K : never
}[keyof T]

/** option选项相关配置 */
export interface DataOptionItem {
  value: number | string | undefined
  label: string
  [prop: string]: any
}

/** option选项集合 */
export type DataOptionItems = Record<string, DataOptionItem[]>
