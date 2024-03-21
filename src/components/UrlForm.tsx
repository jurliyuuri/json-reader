type Props = {
  inputUrl: string,
  setInputUrl: React.Dispatch<React.SetStateAction<string>>,
  setReadUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlForm = ({ inputUrl, setInputUrl, setReadUrl }: Props) => {
  return (
    <input id="url" value={inputUrl} size={40}
      placeholder='http://piyo.github.io/lang/dict.json'
      onChange={(event) => { setInputUrl(event.target.value) }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setReadUrl(inputUrl)
        }
      }} />
  )
}

export default UrlForm