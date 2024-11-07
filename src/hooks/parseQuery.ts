type ParsedQuery = {
  url: string,
  text: string,
  option: string,
  range: string
}

const defaultParsedQuery: ParsedQuery = {
  url: '',
  text: '',
  option: '',
  range: ''
}

const parseQuery = (queryParams: URLSearchParams) => {
  const parsedQuery = [...queryParams]
    .filter(([key,]) => key in defaultParsedQuery)
    .reduce(
      (accumulator, [key, param]) => {
        accumulator[key as keyof ParsedQuery] = decodeURI(param)
        return accumulator
      }, defaultParsedQuery)
  return parsedQuery
}

export default parseQuery