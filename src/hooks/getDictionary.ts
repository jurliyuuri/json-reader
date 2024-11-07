import { Dictionary } from '@/consts/dictionary'

const getDictionary = async (readUrl: string, setReadDict: React.Dispatch<React.SetStateAction<Dictionary>>) => {
  if (readUrl === '') return
  const fetchDictionary = await fetch(readUrl)
  const dirtyDictionary = await fetchDictionary.json()
  if (!Array.isArray(dirtyDictionary.words)) {
    throw new Error('dictionary has no words property')
  }
  setReadDict(dirtyDictionary.words)
}

export default getDictionary