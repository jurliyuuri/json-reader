import { Word } from '@/consts/dictionary'
import { SearchOption } from '@/consts/searchOption'
import { SearchRange } from '@/consts/searchRange'
import { exists } from '@/hooks/common'
import convertQueryToSearchRegex from '@/hooks/convertQueryToSearchRegex'

const filt = (word: Word, text: string, option: SearchOption, range: SearchRange): RegExpMatchArray[] => {
  const regex = convertQueryToSearchRegex(text, option)
  if (range === 'both') {
    return filt(word, text, option, 'word').concat(filt(word, text, option, 'equivalent'))
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
    // range is definitely 'full'
    const filtedWord = filt(word, text, option, 'word')
    const filtedEquivalent = filt(word, text, option, 'equivalent')
    const filtedEquivalentTitle = word.translations
      .map(translation => translation.title.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedTag = filt(word, text, option, 'tag')
    const filtedContents = word.contents
      .map(variation => variation.text.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedContentsTitle = word.contents
      .map(variation => variation.title.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedVariation = word.variations
      .map(variation => variation.text.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedVariationTitle = word.variations
      .map(variation => variation.title.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedRelation = word.relations
      .map(relation => relation.entry.form.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedRelationTitle = word.relations
      .map(relation => relation.title.match(regex))
      .filter(exists<RegExpMatchArray>)
    return filtedWord.concat(
      filtedEquivalent,
      filtedEquivalentTitle,
      filtedTag,
      filtedContents,
      filtedContentsTitle,
      filtedVariation,
      filtedVariationTitle,
      filtedRelation,
      filtedRelationTitle
    ).filter(exists<RegExpMatchArray>)
  }
}

const entryFilter = (word: Word, text: string, option: SearchOption, range: SearchRange) => {
  return filt(word, text, option, range).length > 0
}

export default entryFilter