import type { UIFormItem } from '../UIFormItem'

/**
 * 数字输入
 * @ui formItem
 */
export interface UIInputNumberFormItem extends UIFormItem {
  /**
   * 最小值
   */
  min?: number

  /**
   * 最大值
   */
  max?: number

  /**
   * 控制按钮位置
   * @default right
   * @options right:右侧|left:左侧|both:两侧
   */
  controlsPosition?: string
}
