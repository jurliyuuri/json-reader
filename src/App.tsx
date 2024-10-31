import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Entry from './components/Entry/Entry'
import Search from './components/Search/Search'
import Share from './components/Share/Share'
import Shortcut from './components/Shortcut'
import UrlForm from './components/UrlForm'
import { sampleDictionary } from './consts/dictionary'
import { SearchParams } from './consts/searchParams'
import { castAsSearchOption, castAsSearchRange } from './hooks/caster'
import { getDictionary } from './hooks/getDictionary'
import parseQuery from './hooks/queryParser'

function App() {
  const queryParams = new URLSearchParams(window.location.search.slice(1))
  const parsedQuery = parseQuery(queryParams)
  const [queryUrl, queryText, queryOption, queryRange] = [
    parsedQuery.url,
    parsedQuery.text,
    castAsSearchOption(parsedQuery.option),
    castAsSearchRange(parsedQuery.range)
  ]

  const querySearhParams: SearchParams = {
    text: queryText,
    option: queryOption,
    range: queryRange
  }

  const [readUrl, setReadUrl] = useState(queryUrl)
  const [readDict, setReadDict] = useState(sampleDictionary)
  const [searchParams, setSearchParams] = useState(querySearhParams)

  useEffect(() => {
    getDictionary(readUrl, setReadDict)
  }, [readUrl, setReadDict])

  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/?url=${readUrl}&text=${searchParams.text}&option=${searchParams.option}&range=${searchParams.range}`)
  }, [readUrl, searchParams, navigate])

  return (
    <div>
      <div className='header'>
        <h1><a href='./'>OTM-JSON Online Reader</a></h1>
        <UrlForm queryReadUrl={queryUrl} setReadUrl={setReadUrl} />
        <Shortcut setReadUrl={setReadUrl} />
        <div>
          <Search searchParams={searchParams} setSearchParams={setSearchParams}  />
          <Share readUrl={readUrl} />
        </div>
      </div>
      <Entry readDict={readDict} params={searchParams} />
    </div>
  )
}

export default App
