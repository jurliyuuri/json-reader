import { Dictionary, sampleDictionary } from '@/consts/dictionary'

const isDictionary = (words: Dictionary): words is Dictionary => {
  return words.length === 0 ||
    (Array.isArray(words) &&
      typeof words[0] === 'object' &&
      typeof words[0].entry === 'object' &&
      typeof words[0].entry.id === 'number' &&
      typeof words[0].entry.form === 'string' &&
      Array.isArray(words[0].translations) &&
      Array.isArray(words[0].tags) &&
      Array.isArray(words[0].contents) &&
      Array.isArray(words[0].variations) &&
      Array.isArray(words[0].relations)
    )
}

const getDictionary = async (readUrl: string) => {
  if (readUrl === '') return sampleDictionary
  const fetchDictionary = await fetch(readUrl)
  if (!fetchDictionary.ok) {
    return Promise.reject(new Error('Network Response was not OK'))
  }
  const dirtyDictionary = await fetchDictionary.json()
  if (dirtyDictionary.words == null) {
    return Promise.reject(new Error('No words property'))
  }
  if (dirtyDictionary.words.length === 0) {
    // [] can be cast to Dictionary (=Words[]), so isDictionary([]) returns true
    return Promise.reject(new Error('Empty words property'))
  }
  if (!isDictionary(dirtyDictionary.words)) {
    // NOTICE: isDictionary check only 0th item (in order to reduce amount of calculation)
    return Promise.reject(new Error('Invalid dictionary structure'))
  }
  return dirtyDictionary.words as Dictionary
}

export default getDictionary