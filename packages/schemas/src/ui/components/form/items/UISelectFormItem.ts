import type { UIFormItem } from '../UIFormItem'

/**
 * 选择器
 * @ui formItem
 */
export interface UISelectFormItem extends UIFormItem {
  /**
   * 选项
   * @data options
   */
  options?: Array<any> | string

  /**
   * 标签属性
   * @default label
   * @desc 选项标签对应的可选项属性
   */
  optionLabelProp?: string

  /**
   * 值属性
   * @default value
   * @desc 选项标值对应的可选项属性
   */
  optionValueProp?: string

  /**
   * 折叠选项（多选时）
   * @default true
   * @desc 多选时是否将选中值按文字的形式展示
   */
  collapseTags?: boolean

  /**
   * 支持多选
   */
  multiple?: boolean

  /**
   * 分组属性
   * @desc 如果设置将根据此属性进行分组
   */
  groupName?: string
}
