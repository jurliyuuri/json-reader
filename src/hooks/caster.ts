import { SearchOption, searchOption } from '@/consts/searchOption'
import { SearchRange, searchRange } from '@/consts/searchRange'

export const castAsSearchOption = (param: string) => {
  return searchOption.includes(param as SearchOption) ? param as SearchOption : 'forward'
}

export const castAsSearchRange = (param: string) => {
  return searchRange.includes(param as SearchRange) ? param as SearchRange : 'both'
}