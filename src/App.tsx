import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Entry from './components/Entry/Entry'
import Search from './components/Search/Search'
import Share from './components/Share/Share'
import Shortcut from './components/Shortcut'
import UrlForm from './components/UrlForm'
import { Dictionary, sampleDictionary } from './consts/dictionary'
import getDictionary from './hooks/getDictionary'
import parseQuery from './hooks/parseQuery'

function App() {
  const { url, param } = parseQuery(queryString.parse(location.search))

  const [readUrl, setReadUrl] = useState(url)
  const [searchParams, setSearchParams] = useState(param)

  const useDictionary = (): [Dictionary, boolean, Error | null] => {
    const { data: fetchDict, isLoading, error } = useQuery({
      queryKey: ['dict', readUrl],
      queryFn: async () => getDictionary(readUrl)
    })
    return [fetchDict ?? sampleDictionary, isLoading, error]
  }

  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/?${queryString.stringify({url: readUrl, ...searchParams})}`)
  }, [readUrl, searchParams, navigate])

  return (
    <div>
      <div className='header'>
        <h1><a href='./'>OTM-JSON Online Reader</a></h1>
        <UrlForm readUrl={readUrl} setReadUrl={setReadUrl} />
        <Shortcut setReadUrl={setReadUrl} />
        <Search searchParams={searchParams} setSearchParams={setSearchParams} />
        <Share />
      </div>
      <Entry dictionary={useDictionary()} params={searchParams} />
    </div>
  )
}

export default App
