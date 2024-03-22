import { useState, useEffect } from 'react'
import './styles/App.css'
import Button from './components/Button';
import Entry from './components/Entry';
import Loader from './components/Loader';
import Share from './components/Share';
import UrlForm from './components/UrlForm';
import { Dictionary, sampleJson } from './utils/dictionary';

function App() {
  const queryParams = new URLSearchParams(window.location.search.slice(1))
  const queryReadUrl = queryParams.get("url")
  const queryReadUrlNonNull = queryReadUrl ? decodeURIComponent(queryReadUrl) : ""

  const [inputUrl, setInputUrl] = useState(queryReadUrlNonNull)
  const [readUrl, setReadUrl] = useState(queryReadUrlNonNull)
  const [readDict, setReadDict] = useState(sampleJson)

  useEffect(() => {
    console.log(`readUrl is now set to be ${readUrl}`)
    const getDictionary = async () => {
      if (readUrl === "") return sampleJson
      const dictionary = await fetch(readUrl)
        .then(
          (resolve) => { return resolve.json() as unknown as Dictionary },
          async (reject) => {
            // https://だった場合、http://を試す
            const possibllyRightUrl = `http://${readUrl.slice(8)}`
            const dictionaryWithHTTP = await fetch(possibllyRightUrl).then(
              (res) => {
                setInputUrl(possibllyRightUrl)
                return res.json() as unknown as Dictionary
              },
              (_rej) => {
                alert(`cannot obtain the dictionary: ${reject}`)
                return sampleJson
              }
            )
            return dictionaryWithHTTP
          }
        )
      setReadDict(dictionary)
    }
    getDictionary()
  }, [readUrl])

  return (
    <>
      <div className='header'>
        <h1><a href='./'>OTM-JSON Online Reader</a></h1>
        <div>
          <UrlForm inputUrl={inputUrl} setInputUrl={setInputUrl} setReadUrl={setReadUrl} />
          <Loader inputUrl={inputUrl} setInputUrl={setInputUrl} setReadUrl={setReadUrl} />
        </div>
        <div>
          <Button lang="ail" setReadUrl={setReadUrl} />
          <Button lang="takan" setReadUrl={setReadUrl} />
          <Button lang="bhat" setReadUrl={setReadUrl} />
          <Button lang="pmcf" setReadUrl={setReadUrl} />
          <br />
          <Button lang="calass" setReadUrl={setReadUrl} />
          <Button lang="vic" setReadUrl={setReadUrl} />
          <Button lang="ʁa:v" setReadUrl={setReadUrl} />
          <br />
          <Share readUrl={readUrl} />
        </div>
      </div >
      <div className='outer'>
        <Entry readDict={readDict} />
      </div>
    </>
  )
}

export default App
