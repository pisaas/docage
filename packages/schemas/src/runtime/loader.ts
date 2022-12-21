/**
 * 加载器
 * @desc 用于加载配置(环境配置，应用配置等)
 */
export interface Loader<T = any, C = any> {
  /**
   * 解析环境变量
   */
  load: (context: C, ...args: any[]) => Promise<T>;
}
