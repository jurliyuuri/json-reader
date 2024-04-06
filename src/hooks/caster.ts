import { SearchOption, searchOption } from '@/consts/searchOption'
import { SearchRange, searchRange } from '@/consts/searchRange'

export const castAsSearchOption = (param: string) => {
  return param in searchOption ? param as SearchOption : 'forward'
}

export const castAsSearchRange = (param: string) => {
  return param in searchRange ? param as SearchRange : 'both'
}