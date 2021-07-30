import { noop } from '@docage/core'

// 警告方法
export let warn: (msg?: string) => void = noop

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'

  warn = (msg?: string) => {
    if (hasConsole) {
      console.error(`[Docage Runtime Vue3 warn]: ${msg}`)
    }
  }
}
