const generateUrlWithQuery = (): string => {
  const url = new URL('/json-reader/', location.origin)
  const params = new URLSearchParams(location.search)

  url.searchParams.set('url', params.get('url') ? params.get('url') as string : '')
  url.searchParams.set('text', params.get('text') as string)
  url.searchParams.set('option', params.get('option') as string)
  url.searchParams.set('range', params.get('range') as string)

  return url.toString()
}

export default generateUrlWithQuery