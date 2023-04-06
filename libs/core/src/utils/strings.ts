/** 参考vue实现 */
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

const camelizeRE = /[-_](\w)/g

/**
 * 中划线、下划线转驼峰
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

const hyphenateRE = /\B([A-Z])/g
/**
 * 驼峰转中划线分割
 */
export const hyphenate = cacheStringFunction((str: string) => str.replace(hyphenateRE, '-$1').toLowerCase())

/**
 * 首字母大写
 */
export const capitalize = cacheStringFunction((str: string) => str.charAt(0).toUpperCase() + str.slice(1))

/**
 * 阶段字符串并添加后缀
 * @param v
 * @param length
 * @param postfix
 * @returns
 */
export function truncate(v: string, length: number, postfix = '...'): string {
  const val = String(v)
  return val.length < length ? val : val.substring(0, length) + postfix
}

/**
 * 英文字符的复数
 * @param str
 * @param amount 数量，默认数量为2
 * @returns
 */
export function pluralize(str: string, amount = 2): string {
  if (!amount || amount < 2) {
    return str
  }

  return `${str}s`
}

/**
 * 去除字符串所有自定word的连续开始
 * @param str
 * @param word
 * @returns
 */
export function ltrim(str: string, word = ' '): string {
  if (!str) return str

  const len = word.length
  const end = str.length
  let start = 0

  while (start < end && str.indexOf(word, start) === start) start += len
  return start > 0 ? str.substring(start, end) : str
}

/**
 * 去除字符串所有自定word的连续结尾
 * @param str
 * @param word
 * @returns
 */
export function rtrim(str: string, word = ' '): string {
  if (!str) return str

  const len = word.length
  const start = 0
  let end = str.length

  while (end > start && str.indexOf(word, end - len) === end - len) end -= len
  return end < str.length ? str.substring(start, end) : str
}

/**
 * 去除字符串所有自定word的连续开始和结尾
 * @param str
 * @param word
 * @returns
 */
export function trim(str: string, word = ' '): string {
  if (!str) return str
  return ltrim(rtrim(str, word), word)
}

/**
 * 字符串以指定字符串开始
 * @param str
 * @param exprStr
 * @returns
 */
export function startsWith(str: string, exprStr: string): boolean {
  if (!str || !exprStr || exprStr.length > str.length) {
    return false
  }

  return str.substring(0, exprStr.length) === exprStr
}

/**
 * 字符串以指定字符串结束
 * @param str
 * @param exprStr
 * @returns
 */
export function endsWith(str: string, exprStr: string): boolean {
  if (!str || !exprStr || exprStr.length > str.length) {
    return false
  }

  return str.substring(str.length - exprStr.length) === exprStr
}
