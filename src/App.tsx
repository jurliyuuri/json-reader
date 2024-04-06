import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Entry from './components/Entry/Entry'
import Search from './components/Search/Search'
import Share from './components/Share/Share'
import Shortcut from './components/Shortcut'
import UrlForm from './components/UrlForm'
import { sampleDictionary } from './consts/dictionary'
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

  const [readUrl, setReadUrl] = useState(queryUrl)
  const [readDict, setReadDict] = useState(sampleDictionary)
  const [searchText, setSearchRegex] = useState(queryText)
  const [searchOption, setSearchOption] = useState(queryOption)
  const [searchRange, setSearchRange] = useState(queryRange)

  useEffect(() => {
    getDictionary(readUrl, setReadDict)
  }, [readUrl, setReadDict])

  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/?url=${readUrl}&text=${searchText}&option=${searchOption}&range=${searchRange}`)
  }, [readUrl, searchText, searchOption, searchRange, navigate])

  return (
    <div>
      <div className='header'>
        <h1><a href='./'>OTM-JSON Online Reader</a></h1>
        <UrlForm queryReadUrl={queryUrl} setReadUrl={setReadUrl} />
        <Shortcut setReadUrl={setReadUrl} />
        <div>
          <Search setSearchRegex={setSearchRegex}  />
          <Share readUrl={readUrl} />
        </div>
      </div>
      <Entry readDict={readDict} text={searchText} option={searchOption} range={searchRange} />
    </div>
  )
}

export default App
