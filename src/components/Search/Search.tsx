import { useState } from 'react'
import './Search.css'
import { convertToSearchParams, SearchParams } from '@/consts/searchParams'

type Props = {
  searchParams: SearchParams,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const Search = ({ searchParams, setSearchParams }: Props) => {
  const [query, setQuery] = useState(searchParams.text)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSearchParams(convertToSearchParams(query, searchParams.option, searchParams.range))
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <input type="text" value={query}
          onChange={(event) => setQuery(event.target.value)} />
        <br />
        <input type="radio" name="forward" checked={searchParams.option === 'forward'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'forward', searchParams.range))} />
        <label htmlFor="forward" onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'forward', searchParams.range))}>前方</label>
        <input type="radio" name="partial" checked={searchParams.option === 'partial'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'partial', searchParams.range))} />
        <label htmlFor="partial" onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'partial', searchParams.range))}>部分</label>
        <input type="radio" name="regex" checked={searchParams.option === 'regex'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'regex', searchParams.range))} />
        <label htmlFor="regex" onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'regex', searchParams.range))}>正規</label>
      </fieldset>
    </form>
  )
}

export default Search
