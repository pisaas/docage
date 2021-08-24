// 警告方法
export function warn(msg) {
  console.error(`[Docage Runtime Vue3 example warn]: ${msg}`)
}

// 渲染slot
export function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() : otherwise
}
