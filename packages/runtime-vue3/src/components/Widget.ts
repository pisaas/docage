import { h, resolveComponent, VNode } from 'vue'
import { omit } from '../utils'

const defaultOmitList = [
  'type',
  'name',
  '$ref',
  'className',
  'data',
  'children',
  'ref',
  'visible',
  'visibleOn',
  'hidden',
  'hiddenOn',
  'disabled',
  'disabledOn',
  'component',
  'detectField',
  'defaultValue',
  'defaultData',
  'required',
  'requiredOn',
  'syncSuperStore',
  'mode',
  'body'
]

const Widget = {
  props: {
    schema: {
      type: Object,
      default: () => ({})
    }
  },

  inject: ['root'],

  setup(props: any) {
    const { schema } = props

    // 获取widget组件
    function resolveWidget(type: string) {
      let wType = type
      if (type && !type.startsWith('dc-')) {
        wType = 'dc-' + type
      }
      const c = resolveComponent(wType)
      return c
    }

    // 渲染多个widgets
    function renderWidgets(items: any[]): VNode | VNode[] {
      if (Array.isArray(items)) {
        const wItems = items.map(it => {
          return renderWidget(it)
        })
        return wItems
      }

      return renderWidget(items)
    }

    // 渲染widget
    function renderWidget(item: any): VNode {
      if (typeof item === 'string') {
        item = {
          type: 'html',
          html: item
        }
      }

      const wItem = resolveWidget(item.type)

      // 执行递归
      let bodyChild = null
      if (item.body) {
        bodyChild = renderWidgets(item.body)
      }

      const omitList = defaultOmitList.concat()
      const wAttrs = omit(item, omitList)

      const childKeys = Object.keys(wAttrs).filter(key => {
        return wAttrs[key] && wAttrs[key].type && typeof wAttrs[key].type === 'string'
      })

      const children = childKeys.reduce((target, key) => {
        target[key] = renderWidgets(wAttrs[key])
        return target
      }, {} as any)

      return h(
        wItem,
        { ...wAttrs },
        {
          default: bodyChild,
          ...children
        }
      )
    }

    return () => renderWidgets(schema)
  }
}

export { Widget }
