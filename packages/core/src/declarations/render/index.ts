import { Schema } from '../schema'
import { Widget } from '../widget'

/**
 * 渲染器配置
 */
export interface RendererConfig<T = unknown> extends GenericObject {
  el: Element | string // 渲染dom节点
  root: T // 入口组件
  widgets: Widget<T>[]
  schema: Schema
}

/**
 * 渲染选项
 */
export interface RenderOptions extends GenericObject {}
