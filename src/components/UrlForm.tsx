import { useState } from "react"

type Props = {
  queryReadUrl: string,
  setReadUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlForm = ({ queryReadUrl, setReadUrl }: Props) => {
  const [inputUrl, setInputUrl] = useState(queryReadUrl)
  return (
    <div>
      <input id="url" value={inputUrl} size={40}
        placeholder='http://piyo.github.io/lang/dict.json'
        onChange={(event) => { setInputUrl(event.target.value) }}
        onKeyDown={(event) => { if (event.key === 'Enter') setReadUrl(inputUrl) }} />
      <button value="load" onClick={() => {
        const inputUrlWithHttp = `${inputUrl.slice(0, 7) === 'http://' || inputUrl.slice(0, 8) === 'https://' ? '' : 'http://'}${inputUrl}`
        setInputUrl(inputUrlWithHttp)
        setReadUrl(encodeURI(inputUrlWithHttp))
      }}>load</button>
    </div>
  )
}

export default UrlForm