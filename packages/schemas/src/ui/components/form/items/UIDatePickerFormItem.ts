import type { UIFormItem } from '../UIFormItem'

/**
 * 日期选择
 * @ui formItem
 */
export interface UIDatePickerFormItem extends UIFormItem {
  /**
   * 显示类型
   * @default date
   * @options date:日期|month:月|year:年|dates:多个时间|datetime:日期时间|week:周
   */
  pickerType?: string

  /**
   * 日期值格式
   * @default YYYY-MM-DD HH:mm:ss
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
   * 最小日期
   * @ui date
   * @desc 可以选择的最小日期
   */
  minDate?: string

  /**
   * 最大日期
   * @ui date
   * @desc 可以选择的最大日期
   */
  maxDate?: string
}
