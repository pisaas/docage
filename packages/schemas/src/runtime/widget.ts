/** 组件 */
export type Component = any;

/** 微件 */
export type Widget = any;

/**
 * 微件结构
 */
export interface WidgetSchema {
  /**
   * 应用类型
   * @desc 根据解析器的不同默认类型也不相同
   */
  type: string;

  /**
   * 应用子类型
   */
  body?: WidgetSchema;

  /**
   * 扩展属性
   */
  [prop: string]: any;
}
