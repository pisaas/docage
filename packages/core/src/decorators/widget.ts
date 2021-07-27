/**
 * 基础widget配置
 */
export interface BasicWidgetConfig extends GenericObject {
  name?: string
  type?: string
  weight?: number // 权重，值越低越优先命中
}

/**
 * 表单项widget配置
 */
export interface FormItemWidgetConfig extends BasicWidgetConfig {}

/**
 * widget装饰器
 * @param config - 装饰器配置
 * @returns 装饰方法
 */
export function Widget(config: BasicWidgetConfig): MethodDecorator {
  return () => {}
}

/**
 * 表单项widget装饰器
 * @param config - 表单装饰器配置
 * @returns 装饰方法
 */
export function FormItemWidget(config: FormItemWidgetConfig): MethodDecorator {
  return () => {}
}

export function registerWidget() {}
