import { useState } from "react"
import './Search.css'

type Props = {
  setSearchRegex: React.Dispatch<React.SetStateAction<string>>
}

type SearchOption = 'forward' | 'partial' | 'regex'

const Search = ({ setSearchRegex }: Props) => {
  const [query, setQuery] = useState("")
  const [searchOption, setSearchOption] = useState<SearchOption>('forward')

  const convertQueryToSearchRegex = (queryString: string) => {
    if (searchOption === 'forward') {
      return `^${queryString}`
    } else if (searchOption === 'partial') {
      return queryString
    } else {
      // searchOption is definitely 'regex'
      return queryString
    }
  }

  return (
    <form>
      <fieldset>
        <input type="text" value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setSearchRegex(convertQueryToSearchRegex(query))
            }
          }} />
        <br />
        <input type="radio" name="forward" checked={searchOption === 'forward'} onChange={() => setSearchOption('forward')} />
        <label htmlFor="forward" onClick={() => setSearchOption('forward')}>前方</label>
        <input type="radio" name="partial" checked={searchOption === 'partial'} onChange={() => setSearchOption('partial')} />
        <label htmlFor="partial" onClick={() => setSearchOption('partial')}>部分</label>
        <input type="radio" name="regex" checked={searchOption === 'regex'} onChange={() => setSearchOption('regex')} />
        <label htmlFor="regex" onClick={() => setSearchOption('regex')}>正規</label>
      </fieldset>
    </form>
  )
}

export default Search