import { Word } from '@/consts/dictionary'
import { SearchRange } from '@/consts/searchRange'
import { exists } from '@/hooks/common'

const filt = (word: Word, regex: RegExp, range: SearchRange): RegExpMatchArray[] => {
  if (range === 'both') {
    return filt(word, regex, 'word').concat(filt(word, regex, 'equivalent'))
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
  } else if (range ==='equivalentTag') {
    return word.translations
    .reduce((accumulator, current) => accumulator.concat(current.title), new Array<string>)
    .map(translationTitle => translationTitle.match(regex))
    .filter(exists<RegExpMatchArray>)
  } else {
    // range is definitely 'full'
    const filtedWord = filt(word, regex, 'word')
    const filtedEquivalent = filt(word, regex, 'equivalent')
    const filtedEquivalentTitle = word.translations
      .map(translation => translation.title.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedTag = filt(word, regex, 'tag')
    const filtedContents = word.contents
      .map(content => content.text.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedContentsTitle = word.contents
      .map(content => content.title.match(regex))
      .filter(exists<RegExpMatchArray>)
    const filtedVariation = word.variations
      .map(variation => variation.form.match(regex))
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

const entryFilter = (word: Word, text: RegExp, range: SearchRange) => {
  return filt(word, text, range).length > 0
}

export default entryFilter