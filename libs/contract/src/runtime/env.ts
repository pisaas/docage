export type EnvData = Record<string, any>

/** 本地环境变量 */
export interface LocalEnv extends EnvData {
  /**
   * 当前环境名
   */
  readonly name: string

  /**
   * 当前客户端Id，一般用于权限认证等情况
   */
  readonly clientId?: string
}

/** 应用环境变量 */
export interface Env extends LocalEnv {}

/** 标签和环境变量的映射 */
export interface EnvDataMap {
  [envName: string]: {
    /**
     * 环境标签
     * @desc 根据特定标签由环境提供者判断获取真实环境
     * 比如api调用情况下，这里的标签可以是主机名
     */
    TAGs?: string[]

    /**
     *
     */
    ENV: EnvData

    /**
     * 是否默认配置
     * @desc 若没有匹配
     */
    default?: boolean

    /**
     * 扩展属性
     */
    [prop: string]: any
  }
}
