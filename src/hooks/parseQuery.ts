import queryString from "query-string"
import { castAsSearchOption, castAsSearchRange } from "./caster"
import { SearchParams } from "@/consts/searchParams"

type ParsedParams = {
  url: string,
  param: SearchParams
}

const parseQuery = (queryParams: queryString.ParsedQuery) => {
  const [url, text, option, range] = [queryParams.url, queryParams.text, queryParams.option, queryParams.range]
  return {
    url: typeof url === 'string' ? url : '',
    param: {
      text: typeof text === 'string' ? text : '',
      option: castAsSearchOption(option as string),
      range: castAsSearchRange(range as string)
    }
  } as ParsedParams
}

export default parseQuery