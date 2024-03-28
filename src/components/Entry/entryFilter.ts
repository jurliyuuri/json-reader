import { Word } from '@/consts/dictionary'
import { SearchRange } from '@/consts/searchRange'
import { exists } from '@/hooks/common'

const filt = (word: Word, regex: RegExp, range: SearchRange): RegExpMatchArray[] => {
  if (range === 'both') {
    return filt(word, regex, 'word').concat(filt(word, regex, 'equvalent'))
  } else if (range === 'word') {
    return [word.entry.form.match(regex)].filter(exists<RegExpMatchArray>)
  } else if (range === 'equivalent') {
    return word.translations
      .reduce((accumulator, current) => accumulator.concat(current.forms), new Array<string>)
      .map(translation => translation.match(regex))
      .filter(exists<RegExpMatchArray>)
  } else if (range === 'tag') {
    return word.tags
      .map(tag => tag.match(regex))
      .filter(exists<RegExpMatchArray>)
  } else {
    return [].filter(exists<RegExpMatchArray>)
  }
}

const entryFilter = (word: Word, regex: RegExp, range: SearchRange) => {
  return filt(word, regex, range).length > 0
}

export default entryFilter