import type { UIFormRule } from './UIFormRule'

/**
 * 表单集合
 * @ui formItems
 */
export type UIFormItems = Array<UIFormItem>

/**
 * 表单项
 */
export interface UIFormItem {
  /**
   * 标签
   */
  label: string

  /**
   * 属性
   */
  prop?: string

  /**
   * 跨度
   * @default 6
   * @desc 表单项占一行(24)的跨度
   */
  span?: number

  /**
   * 标签宽度
   */
  labelWidth?: string | number

  /**
   * 是否必填
   */
  required?: boolean

  /**
   * 是否可清空
   * @default true
   */
  clearable?: boolean

  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean

  /**
   * 验证规则
   * @ui formRules
   */
  rules?: Array<UIFormRule>
}
