import { Schema } from '../declarations/schema'

export class BaseSchema implements Schema {
  [prop: string]: any
}
