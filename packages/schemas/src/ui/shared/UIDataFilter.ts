/**
 * 数据过滤器类型
 */
export enum DataFilterType {
  /**
   * 金额（分）
   */
  MONEY_FEN = 'fenMoney',

  /**
   * 金额（元）
   */
  MONEY_YUAN = 'yuanMoney',

  /**
   * 枚举字符串格式化
   */
  ENUM_STR = 'enumStr',

  /**
   * 日期
   */
  DATE = 'date',

  /**
   * 是否
   */
  YES_NO = 'yesNo',

  /**
   * 自定义
   */
  CUSTOM = 'custom'
}

/**
 * 数据过滤器方法
 */
export type UIDataFilterFunction<T = any, O = any, R = any> = (input: T, options: O) => R

/**
 * 数据过滤器结构
 * @ui formatter
 */
export interface UIDataFilter {
  /**
   * 过滤器类型
   */
  name: string

  /**
   * 格式化方法
   */
  fn?: UIDataFilterFunction
}

/**
 * 数据过滤器结构
 * @ui formatter
 */
export interface UIFormatter {
  /**
   * 过滤器类型
   */
  name?: string

  /**
   * 前缀
   */
  prefix?: string

  /**
   * 后缀
   */
  postfix?: string

  /**
   * 格式化模版
   */
  tpl?: string

  /**
   * 格式化方法
   */
  fn?: UIDataFilterFunction<string>
}
