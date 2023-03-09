/**
 * 过滤器采用统一规范对数据或文本进行处理
 */

/**
 * 数据过滤器方法
 */
export type FilterHandler<T = any, O = any, R = any> = (input: T, options: O) => R

/**
 * 过滤器类型
 */
export enum FilterType {
  /**
   * 数据过滤器
   */
  DATA = 'data',

  /**
   * 文本过滤器
   */
  TEXT = 'text'
}

/**
 * 数据过滤器结构
 */
export interface Filter<T = any, O = any, R = any> {
  /**
   * 过滤器类型，默认数据过滤器
   */
  type?: FilterType

  /**
   * 过滤器名称
   */
  name: string

  /**
   * 格式化方法
   */
  handler?: FilterHandler<T, O, R>
}

/**
 * 文本过滤器
 */
export interface TextFilter extends Filter<any, any, string> {
  /**
   * 文本过滤器
   */
  type: FilterType.TEXT

  /**
   * 前缀
   */
  prefix?: string

  /**
   * 后缀
   */
  postfix?: string
}
