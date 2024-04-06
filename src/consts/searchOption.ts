export type SearchOption = 'forward' | 'partial' | 'regex'
export const searchOption: SearchOption[] = [
  'forward',
  'partial',
  'regex'
]
export const isSearchType = (s: string): s is SearchOption => s in searchOption