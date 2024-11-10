import { Dictionary, isDictionary, sampleDictionary } from '@/consts/dictionary'

const getDictionary = async (readUrl: string) => {
  if (readUrl === '') return sampleDictionary
  const fetchDictionary = await fetch(readUrl)
  if (!fetchDictionary.ok) {
    return Promise.reject('Network Response was not OK')
  }
  const dirtyDictionary = await fetchDictionary.json()
  if (!Array.isArray(dirtyDictionary.words)) {
    return Promise.reject('No words property')
  }
  if (!isDictionary(dirtyDictionary.words)) {
    // NOTICE: isDictionary は 0 番目の要素しか type check していない
    return Promise.reject('Invalid dictionary structure')
  }
  return dirtyDictionary.words as Dictionary
}

export default getDictionary