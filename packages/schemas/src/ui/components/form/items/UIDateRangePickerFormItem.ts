import type { UIFormItem } from '../UIFormItem'

/**
 * 日期范围
 * @ui formItem
 */
export interface UIDateRangePickerFormItem extends UIFormItem {
  /**
   * 结束日期属性
   * @index 3
   */
  toProp: string

  /**
   * 显示类型
   * @default date
   * @options date:日期|month:月|year:年|dates:多个时间|datetime:日期时间|week:周
   */
  pickerType?: string

  /**
   * 日期值格式
   * @default YYYY-MM-DD
   */
  valueFormat?: string

  /**
   * 今日之前
   * @default true
   * @desc 限制只能选择今天之前的日期
   */
  beforeToday?: boolean

  /**
   * 今日之前
   * @default false
   * @desc 限制只能选择今天之后的日期
   */
  afterToday?: boolean

  /**
   * 最大时间
   * @ui date
   * @desc 可选最大时间
   */
  beforeDate?: string

  /**
   * 最小时间
   * @ui date
   * @desc 可选最小时间
   */
  afterDate?: string

  /**
   * 默认开始时间
   * @ui date
   */
  defaultFrom?: string

  /**
   * 默认结束时间
   * @ui date
   */
  defaultTo?: string

  /**
   * 默认时间范围(天)
   * @default 1
   */
  defaultRange?: number

  /**
   * 默认最大时间范围(天)，0为无限制
   */
  maxRange?: number

  /**
   * 取消日期联动
   * @default false
   * @desc 在范围选择器里取消两个日期面板之间的联动
   */
  unlinkPanels?: boolean

  /**
   * 是否附加时间
   * @desc 选择后是否为日期附加时间段
   */
  appendTime?: boolean
}
