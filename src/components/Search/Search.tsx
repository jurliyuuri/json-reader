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
        <input type='text' value={query}
          onChange={(event) => setQuery(event.target.value)} />
        <br />
        <input type='radio' name='forward' checked={searchParams.option === 'forward'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'forward', searchParams.range))} />
        <label htmlFor='forward' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'forward', searchParams.range))}>前方</label>
        <input type='radio' name='partial' checked={searchParams.option === 'partial'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'partial', searchParams.range))} />
        <label htmlFor='partial' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'partial', searchParams.range))}>部分</label>
        <input type='radio' name='exact' checked={searchParams.option === 'exact'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'exact', searchParams.range))} />
        <label htmlFor='exact' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'exact', searchParams.range))}>完全</label>
        <input type='radio' name='regex' checked={searchParams.option === 'regex'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, 'regex', searchParams.range))} />
        <label htmlFor='regex' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, 'regex', searchParams.range))}>正規</label>
        <br />
        <input type='radio' name='both' checked={searchParams.range === 'both'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'both'))} />
        <label htmlFor='both' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'both'))}>単語+訳語</label>
        <input type='radio' name='word' checked={searchParams.range === 'word'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'word'))} />
        <label htmlFor='word' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'word'))}>単語</label>
        <input type='radio' name='equivalent' checked={searchParams.range === 'equivalent'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'equivalent'))} />
        <label htmlFor='equivalent' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'equivalent'))}>訳語</label>
        <input type='radio' name='tag' checked={searchParams.range === 'tag'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'tag'))} />
        <label htmlFor='tag' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'tag'))}>タグ</label>
        <input type='radio' name='full' checked={searchParams.range === 'full'} onChange={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'full'))} />
        <label htmlFor='full' onClick={() => setSearchParams(convertToSearchParams(searchParams.text, searchParams.option, 'tag'))}>全文</label>        
      </fieldset>
    </form>
  )
}

export default Search
