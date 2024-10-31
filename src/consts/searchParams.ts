import { SearchOption } from "./searchOption"
import { SearchRange } from "./searchRange"

export type SearchParams = {
  text: string,
  option: SearchOption,
  range: SearchRange
}
export const convertToSearchParams = (text: string, option: SearchOption, range: SearchRange): SearchParams => {
  return {
    text: text,
    option: option,
    range: range
  }
}