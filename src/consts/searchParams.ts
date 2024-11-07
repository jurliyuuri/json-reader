import { SearchOption } from './searchOption'
import { SearchRange } from './searchRange'

export type SearchParams = {
  text: string,
  option: SearchOption,
  range: SearchRange
}