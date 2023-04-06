/**
 * 基于时间戳的 uuid
 *
 * @returns uniqueId
 */
export function uniqId() {
  return (+new Date()).toString(36)
}

/**
 * 生成 8 位随机数字。
 *
 * @return {string} 8位随机数字
 */
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + s4()
}

// 参考 https://github.com/streamich/v4-uuid
const str = () =>
  // eslint-disable-next-line
  ('00000000000000000' + (Math.random() * 0xffffffffffffffff).toString(16)).slice(-16)

export const uuidv4 = () => {
  const a = str()
  const b = str()
  return `${a.slice(0, 8)}-${a.slice(8, 12)}-4${a.slice(13)}-a${b.slice(1, 4)}-${b.slice(4)}`
}

/**
 * 结合uniqId和uuidv4
 *
 * @returns uniqueId
 */
export const uuid = () => {
  const a = str()
  const b = str()
  return `${uniqId()}-${a.slice(8, 12)}-4${a.slice(13)}-a${b.slice(1, 4)}-${b.slice(4)}`
}
