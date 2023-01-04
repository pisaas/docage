/**
 * 事件模型
 * @desc 事件作为基础模式之一，驱动了框架插件化模式架构
 */

// 事件类型
export type EventType = string

// 事件参数
export type EventData = Record<EventType, unknown>

// 事件处理函数，具有可选的事件参数，并且不应当有返回值
export declare type EventHandler<T = unknown> = (event: T) => void
export type WildcardEventHandler<T = EventData> = (type: keyof T, event: T[keyof T]) => void

// 针对单一事件类型注册的一组事件处理函数
export type EventHandlerList<T = unknown> = Array<EventHandler<T>>
export type WildCardEventHandlerList<T = EventData> = Array<WildcardEventHandler<T>>

// 一组事件类型及其处理函数的字典
export type EventHandlerMap<Events extends EventData> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

// 事件发射器
export interface IEventEmitter<Events extends EventData> {
  all: EventHandlerMap<Events>

  on<Key extends keyof Events>(type: Key, handler: EventHandler<Events[Key]>): void
  on(type: '*', handler: WildcardEventHandler<Events>): void

  off<Key extends keyof Events>(type: Key, handler?: EventHandler<Events[Key]>): void
  off(type: '*', handler: WildcardEventHandler<Events>): void

  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}
