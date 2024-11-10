import { useState } from 'react'

type Props = {
  readUrl: string,
  setReadUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlForm = ({ readUrl, setReadUrl }: Props) => {
  const [inputUrl, setInputUrl] = useState(readUrl)
  return (
    <div>
      <input id='url' value={inputUrl} size={40}
        placeholder='https://piyo.github.io/lang/dict.json'
        onChange={(event) => { setInputUrl(event.target.value) }}
        onKeyDown={(event) => { if (event.key === 'Enter') setReadUrl(inputUrl) }} />
      <button value='load' onClick={() => {
        const inputUrlWithHttp = `${inputUrl.slice(0, 7) === 'http://' || inputUrl.slice(0, 8) === 'https://' ? '' : 'https://'}${inputUrl}`
        setInputUrl(inputUrlWithHttp)
        setReadUrl(encodeURI(inputUrlWithHttp))
      }}>load</button>
    </div>
  )
}

export default UrlForm