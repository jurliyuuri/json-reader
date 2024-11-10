import { SearchOption } from '@/consts/searchOption'

const escapeRegex = (str: string) => {
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}

const convertQueryToSearchRegex = (queryString: string, searchOption: SearchOption) => {
  let query = ''
  if (queryString === '') {
    return new RegExp(query)
  }
  if (searchOption === 'forward') {
    query = `^${escapeRegex(queryString)}`
  } else if (searchOption === 'partial') {
    query = escapeRegex(queryString)
  } else if (searchOption === 'exact') {
    query = `^${escapeRegex(queryString)}$`
  } else {
    query = queryString // searchOption is definitely 'regex'
  }
  return new RegExp(query)
}

export default convertQueryToSearchRegex