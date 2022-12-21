/**
 * 样式
 * @ui style
 */
export interface UIStyle {
  /**
   * 背景
   */
  background?: string

  /**
   * 颜色
   */
  color?: string

  [prop: string]: string | undefined
}
