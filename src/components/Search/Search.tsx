import { useState } from 'react'
import './Search.css'
import { SearchParams } from '@/consts/searchParams'

type Props = {
  searchParams: SearchParams,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const Search = ({ searchParams, setSearchParams }: Props) => {
  const { text, option, range } = searchParams
  const [query, setQuery] = useState(text)
  
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSearchParams({...searchParams, text: query})
  }
  const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    setSearchParams({...searchParams, text: query})
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <input type='text' value={query}
          onChange={(event) => setQuery(event.target.value)} />
        <input type="button" value='Search' onClick={handleClick} />
        <br />
        <input type='radio' name='forward' checked={option === 'forward'} onChange={() => setSearchParams({...searchParams, option: 'forward'})} />
        <label htmlFor='forward' onClick={() => setSearchParams({...searchParams, option: 'forward'})}>前方</label>
        <input type='radio' name='partial' checked={option === 'partial'} onChange={() => setSearchParams({...searchParams, option: 'partial'})} />
        <label htmlFor='partial' onClick={() => setSearchParams({...searchParams, option: 'partial'})}>部分</label>
        <input type='radio' name='exact' checked={option === 'exact'} onChange={() => setSearchParams({...searchParams, option: 'exact'})} />
        <label htmlFor='exact' onClick={() => setSearchParams({...searchParams, option: 'exact'})}>完全</label>
        <input type='radio' name='regex' checked={option === 'regex'} onChange={() => setSearchParams({...searchParams, option: 'regex'})} />
        <label htmlFor='regex' onClick={() => setSearchParams({...searchParams, option: 'regex'})}>正規</label>
        <br />
        <input type='radio' name='both' checked={range === 'both'} onChange={() => setSearchParams({...searchParams, range: 'both'})} />
        <label htmlFor='both' onClick={() => setSearchParams({...searchParams, range: 'both'})}>単語+訳語</label>
        <input type='radio' name='word' checked={range === 'word'} onChange={() => setSearchParams({...searchParams, range: 'word'})} />
        <label htmlFor='word' onClick={() => setSearchParams({...searchParams, range: 'word'})}>単語</label>
        <input type='radio' name='equivalent' checked={range === 'equivalent'} onChange={() => setSearchParams({...searchParams, range: 'equivalent'})} />
        <label htmlFor='equivalent' onClick={() => setSearchParams({...searchParams, range: 'equivalent'})}>訳語</label>
        <input type='radio' name='tag' checked={range === 'tag'} onChange={() => setSearchParams({...searchParams, range: 'tag'})} />
        <label htmlFor='tag' onClick={() => setSearchParams({...searchParams, range: 'tag'})}>タグ</label>
        <input type='radio' name='full' checked={range === 'full'} onChange={() => setSearchParams({...searchParams, range: 'full'})} />
        <label htmlFor='full' onClick={() => setSearchParams({...searchParams, range: 'tag'})}>全文</label>
      </fieldset>
    </form> 
  )
}

export default Search
