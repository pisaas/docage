import type { UIFormItem } from '../UIFormItem'

/**
 * 文本输入
 * @ui formItem
 */
export interface UIInputFormItem extends UIFormItem {
  /**
   * 输入类型
   * @default text
   * @options text:单行文本框|textarea:多行文本框
   */
  inputType?: string

  /**
   * 最大长度
   * @desc 默认text: 100，textarea: 300, 可在应用配置中进行配置
   */
  maxlength?: number

  /**
   * 是否显示文字限制
   */
  showWordLimit?: boolean
}
