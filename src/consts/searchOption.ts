export type SearchOption = 'forward' | 'partial' | 'exact' | 'regex'
export const searchOption: SearchOption[] = [
  'forward',
  'partial',
  'exact',
  'regex'
]
export const isSearchType = (s: string): s is SearchOption => s in searchOption