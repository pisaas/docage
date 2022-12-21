import { UIInputFormItem } from './UIInputFormItem'
import { UIDatePickerFormItem } from './UIDatePickerFormItem'
import { UIDateRangePickerFormItem } from './UIDateRangePickerFormItem'
import { UIInputNumberFormItem } from './UIInputNumberFormItem'
import { UISelectFormItem } from './UISelectFormItem'
import { UISwitchFormItem } from './UISwitchFormItem'
import { UIPlaceholderFormItem } from './UIPlaceholderFormItem'

export type MixedUIFormItems =
  | UIInputFormItem
  | UIInputNumberFormItem
  | UIDatePickerFormItem
  | UIDateRangePickerFormItem
  | UISelectFormItem
  | UISwitchFormItem
  | UIPlaceholderFormItem
