import queryString from "query-string"
import { SearchParams } from "@/consts/searchParams"

const generateUrlWithQuery = (readUrl: string, params: SearchParams): string => {
  return queryString.stringifyUrl({
    url: `${location.origin}/json-reader/`,
    query: {url: readUrl, ...params}
  })
}

export default generateUrlWithQuery