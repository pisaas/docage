import { warn } from './debug'

/**
 * 获取dom元素
 * @param el
 * @returns
 */
export function queryEl(el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      if (__BROWSER__) {
        process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el)
      }
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
