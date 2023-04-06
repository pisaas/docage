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

/**
 * 参考vscode Thenable
 * Thenable is a common denominator between ES6 promises, Q, jquery.Deferred, WinJS.Promise,
 * and others. This API makes no assumption about what promise library is being used which
 * enables reusing existing code without migrating to a specific promise implementation. Still,
 * we recommend the use of native promises which are available in this editor.
 */
export interface Thenable<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult>(
    onfulfilled?: (value: T) => TResult | Thenable<TResult>,
    onrejected?: (reason: any) => TResult | Thenable<TResult>
  ): Thenable<TResult>
  then<TResult>(
    onfulfilled?: (value: T) => TResult | Thenable<TResult>,
    onrejected?: (reason: any) => void
  ): Thenable<TResult>
}
