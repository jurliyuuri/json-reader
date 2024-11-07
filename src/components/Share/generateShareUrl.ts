import { SearchParams } from "@/consts/searchParams"

const generateShareUrl = (readUrl: string, searchParams: SearchParams): string => {
  const url = new URL('/json-reader/', window.location.origin)

  if (readUrl) {
    url.searchParams.set('url', readUrl)
  }

  url.searchParams.set('text', searchParams.text)
  url.searchParams.set('option', searchParams.option)
  url.searchParams.set('range', searchParams.range)

  return url.toString()
}

export default generateShareUrl