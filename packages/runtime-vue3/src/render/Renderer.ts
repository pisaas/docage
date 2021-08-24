import { App, Plugin, Component, createApp } from 'vue'
import { RendererConfig, RenderOptions, Schema, Widget } from '@docage/core'

import { warn, queryEl } from '../utils'

/**
 * Vue3渲染器
 */
export class Renderer {
  private _app?: App<Element>
  private _el: Element
  private _entry: Component
  private _widgets: Widget<Component>[]
  private _schema: Schema

  constructor(options: RendererConfig<Component>) {
    this._el = queryEl(options.el)
    this._entry = options.entry
    this._widgets = options.widgets
    this._schema = options.schema
  }

  get entry() {
    return this._entry
  }

  get app() {
    return this._app
  }

  get widgets() {
    return this._widgets
  }

  get schema() {
    return this._schema
  }

  /**
   * 创建渲染器实例
   * @param options - 渲染选项
   */
  create(options: RenderOptions = {}) {
    const { entry, schema, widgets } = this

    const app = createApp(entry, {
      schema,
      ...options.props
    })

    // 关联根配置
    if (typeof options.config === 'object') {
      Object.keys(options.config).forEach((key: string) => {
        // @ts-ignore
        app.config[key] = options.config[key]
      })
    }

    this._app = app

    // 注册组件
    this.register(widgets)

    return this
  }

  use(plugin: Plugin, ...options: any[]) {
    const app = this.app

    if (!app) {
      warn('请先执行实例化再加载插件。')
      return this
    }

    app.use(plugin, ...options)
    return this
  }

  // 注册微件
  register(widgets: Component | Component[]) {
    const app = this.app

    if (!app) {
      warn('请先执行实例化再注册微件。')
      return this
    }

    let wItems: Component[] = []

    if (Array.isArray(widgets)) {
      wItems = widgets
    } else {
      wItems = [widgets]
    }

    for (let w of wItems) {
      if (w.name) {
        app.component(w.name, w)
      } else {
        throw new Error('请提供微件名称。')
      }
    }
  }

  /**
   * 加载组件
   * @param el - 容器元素
   * @returns
   */
  mount(el: Element | string) {
    const app = this.app

    if (!app) {
      warn('请先执行实例化再加载。')
      return this
    }

    const mountEl = el || this._el

    app.mount(mountEl)
    return this
  }
}
