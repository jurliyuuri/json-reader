import { useState, useEffect } from 'react'
import './styles/App.css'
import Button from './components/Button';
import Entry from './components/Entry';
import Share from './components/Share';
import { Dictionary, sampleJson } from './models/dictionary';

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
          (reject) => {
            alert(`cannot obtain the dictionary: ${reject}`)
            return sampleJson
          }
        )
      setReadDict(dictionary)
    }
    getDictionary()
  }, [readUrl])

  return (
    <>
      <div className='header'>
        <h1>OTM-JSON Online Reader</h1>
        <div>
          <input id="url" value={inputUrl} size={40} placeholder='http://piyo.github.io/lang/dict.json'
            onChange={(event) => { setInputUrl(event.target.value) }} />
          <button value="load" onClick={() => { setReadUrl(encodeURI(inputUrl)) }}>load</button>
        </div>
        <div>
          <Button lang="ail" readUrlSetter={setReadUrl} />
          <Button lang="takan" readUrlSetter={setReadUrl} />
          <Button lang="bhat" readUrlSetter={setReadUrl} />
          <Button lang="pmcf" readUrlSetter={setReadUrl} />
          <br />
          <Button lang="calass" readUrlSetter={setReadUrl} />
          <Button lang="vic" readUrlSetter={setReadUrl} />
          <Button lang="ʁa:v" readUrlSetter={setReadUrl} />
          <Share readUrl={readUrl} />
        </div>
      </div>
      <div className='outer'>
        <Entry readDict={readDict} />
      </div>
    </>
  )
}

export default App
