const hasConsole = typeof console !== 'undefined'

// 警告方法
export function warn(msg?: string) {
  if (hasConsole) {
    console.error(`[Docage Runtime Vue3 warn]: ${msg}`)
  }
}
