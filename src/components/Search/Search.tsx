import { useState } from 'react'
import { SearchOption } from '@/consts/searchOption'
import { SearchParams } from '@/consts/searchParams'
import { SearchRange } from '@/consts/searchRange'
import './Search.css'

type Props = {
  searchParams: SearchParams,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const Search = ({ searchParams, setSearchParams }: Props) => {
  const { text, option, range } = searchParams
  const [query, setQuery] = useState(text)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSearchParams({ ...searchParams, text: query })
  }
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setSearchParams({ ...searchParams, text: query })
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <input type='text' value={query} onChange={(event) => setQuery(event.target.value)} />
        <button type="button" onClick={handleClick}>Search</button>
        <br />
        <select
          value={option}
          onChange={(e) => setSearchParams({ ...searchParams, option: e.target.value as SearchOption })}>
          <option value='forward'>前方</option>
          <option value='partial'>部分</option>
          <option value='exact'>完全</option>
          <option value='regex'>正規</option>
        </select>
        <select
          value={range}
          onChange={(e) => setSearchParams({ ...searchParams, range: e.target.value as SearchRange })}>
          <option value='both'>単語+訳語</option>
          <option value='word'>単語</option>
          <option value='equivalent'>訳語</option>
          <option value='equivalentTag'>品詞</option>
          <option value='tag'>タグ</option>
          <option value='full'>全文</option>
        </select>
      </fieldset>
    </form>
  )
}

export default Search
