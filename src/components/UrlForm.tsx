import queryString from 'query-string'
import { useState } from 'react'

type Props = {
  readUrl: string,
  setReadUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlForm = ({ readUrl, setReadUrl }: Props) => {
  const [inputUrl, setInputUrl] = useState(readUrl)
  const setUrls = (url: string) => {
    const inputUrlWithHttps = `${url.slice(0, 7) === 'http://' || url.slice(0, 8) === 'https://' ? '' : 'https://'}${url}`
    setInputUrl(inputUrlWithHttps)
    setReadUrl(queryString.stringifyUrl({ url: inputUrlWithHttps, query: {} }))
  }
  return (
    <div>
      <input id='url' value={inputUrl} size={40}
        placeholder='https://piyo.github.io/lang/dict.json'
        onChange={(e) => { setInputUrl(e.target.value) }}
        onKeyDown={(e) => { if (e.key === 'Enter') setUrls(inputUrl) }} />
      <button value='load' onClick={() => setUrls(inputUrl)}>load</button>
    </div>
  )
}

export default UrlForm