type Props = {
  inputUrl: string,
  setInputUrl: React.Dispatch<React.SetStateAction<string>>,
  setReadUrl: React.Dispatch<React.SetStateAction<string>>
}

const Loader = ({ inputUrl, setInputUrl, setReadUrl }: Props) => {
  return (
    <button value="load" onClick={() => {
      const inputUrlWithHTTPS =
        `${(inputUrl.slice(0, 7) === 'http://' || inputUrl.slice(0, 8) === 'https://') ? '' : 'https://'}${inputUrl}`
      setInputUrl(inputUrlWithHTTPS)
      setReadUrl(encodeURI(inputUrlWithHTTPS))
    }}>load</button>
  )
}

export default Loader