import { Schema } from '../schema'

export interface Widget<T = unknown> {
  Schema: Schema
  View: T
}
