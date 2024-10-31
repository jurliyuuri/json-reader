import { SearchParams } from "@/consts/searchParams"

const generateShareUrl = (readUrl: string, searchParams: SearchParams): string => {
  const url = readUrl ? `url=${readUrl}` : ''
  const params = `text=${searchParams.text}&option=${searchParams.option}&range=${searchParams.range}`
  return `${window.location.protocol}//${window.location.host}/json-reader/?${url ? `${url}&` : ''}${params}`
}

export default generateShareUrl