import { Component, createApp } from 'vue'
import { RendererConfig, RenderOptions, Schema, Widget } from '@docage/core'

import { queryEl } from '../utils'

/**
 * Vue3渲染器
 */
export class Renderer {
  el: Element
  root: Component
  widgets: Widget<Component>[]
  schema: Schema

  constructor(options: RendererConfig<Component>) {
    this.el = queryEl(options.el)
    this.root = options.root
    this.widgets = options.widgets
    this.schema = options.schema
  }

  /**
   * 渲染
   * @param options - 渲染选项
   */
  render(options: RenderOptions = {}) {
    const { root, el } = this

    const instance = createApp(root)

    // 设置示例配置
    instance.config = options.config

    instance.mount(el)

    return instance
  }
}
