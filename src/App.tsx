import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button';
import Entry from './components/Entry/Entry';
import Share from './components/Share/Share';
import UrlForm from './components/UrlForm';
import { sampleDictionary } from './consts/dictionary';
import Search from './components/Search/Search';

function App() {
  const queryParams = new URLSearchParams(window.location.search.slice(1))
  const nullableQueryReadUrl = queryParams.get("url")
  const queryReadUrl = nullableQueryReadUrl ? decodeURIComponent(nullableQueryReadUrl) : ""

  const [readUrl, setReadUrl] = useState(queryReadUrl)
  const [readDict, setReadDict] = useState(sampleDictionary)
  const [searchRegex, setSearchRegex] = useState("")

  useEffect(() => {
    console.log(`readUrl is now set to be ${readUrl}`)
    const getDictionary = async () => {
      if (readUrl === "") setReadDict(sampleDictionary)
      const fetchDictionary = await fetch(readUrl)
      const dirtyDictionary = await fetchDictionary.json()
      if (!Array.isArray(dirtyDictionary.words)) {
        setReadDict(sampleDictionary)
        throw new Error('dictionary has no words property')
      }
      setReadDict(dirtyDictionary.words)
    }
    getDictionary()
  }, [readUrl])

  return (
    <>
      <div className='header'>
        <h1><a href='./'>OTM-JSON Online Reader</a></h1>
        <div>
          <UrlForm queryReadUrl={queryReadUrl} setReadUrl={setReadUrl} />
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
          <Search setSearchRegex={setSearchRegex} />
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
