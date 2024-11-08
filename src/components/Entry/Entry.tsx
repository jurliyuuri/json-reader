import { useState } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import './Entry.css'
import entryFilter from './entryFilter'
import image from '@/assets/jump.svg'
import { Dictionary, Word } from '@/consts/dictionary'
import { SearchParams } from '@/consts/searchParams'
import convertQueryToSearchRegex from '@/hooks/convertQueryToSearchRegex'

const Form = ({ word, permalinkId }: { word: Word, permalinkId: string }) => {
  const [show, setShow] = useState(false)
  return (
    <div id={permalinkId} onMouseOver={() => setShow((prevShow) => !prevShow)} onMouseOut={() => setShow((prevShow) => !prevShow)}>
      <div className='word-form'>{word.entry.form}</div>
      <div className='tags'>
        {word.tags.map(tag => <span key={tag} className='bordered-info'>{tag}</span>)}
      </div>
      {show && <AnchorLink href={`#${permalinkId}`}>¶</AnchorLink>}
    </div>
  )
}

const Translations = ({ word }: { word: Word }) => {
  return (
    <div className='word-infos'>
      {word.translations.map(({ title, forms }) =>
        <p className='word-info' key={`${title}${forms.join('')}`}>
          <span className='bordered-info'>{title}</span>{forms.join(', ')}
        </p>
      )}
    </div>
  )
}

const Contents = ({ word }: { word: Word }) => {
  return (
    <div className='word-infos'>
      {word.contents.map(({ title, text }) =>
        <p className='word-info' key={`${title}${text}`}><span className='nonbordered-info'>{title}</span>{text}</p>
      )}
    </div>
  )
}

const Variations = ({ word }: { word: Word }) => {
  return (
    <div className='word-infos'>
      {word.variations.map(({ title, text }) =>
        <div className='word-info' key={`${title}${text}`}><span className='variation-title'>&gt; {title}</span>{text}</div>
      )}
    </div>
  )
}

const Relations = ({ word }: { word: Word }) => {
  const [show, setShow] = useState(word.relations.reduce<Record<string, boolean>>((acc, relation) => {
    const key = `${relation.title}${relation.entry.id}`
    acc[key] = false
    return acc
  }, {}))
  
  const handleMouseEvent = (key: string) => {
    setShow((prevShow) => ({ ...prevShow, [key]: !prevShow[key]}))
  }

  const params = new URLSearchParams(location.search)
  const query = decodeURIComponent(new URLSearchParams({
    url: params.get('url') ? params.get('url') as string : '',
    option: 'exact',
    range: 'word'
  }).toString())
  const newTabUrlWithoutText = `${location.origin}/json-reader/?${query}`

  return (
    <div className='word-infos'>
      {word.relations.map(({ title, entry }) => {
        const key = `${title}${entry.id}`
        return (
          <p className='word-info'
            key={key}
            onMouseOver={() => handleMouseEvent(key)}
            onMouseOut={() => handleMouseEvent(key)}
          >
            →<span className='bordered-info'>{title}</span>
            <AnchorLink href={`#id${entry.id}_${entry.form.split(' ').join('_')}`}>{entry.form}</AnchorLink>
            {show[key] && <a href={`${newTabUrlWithoutText}&text=${entry.form}`} target='_blank'><img src={image} className='jump' /></a>}
          </p>
        )
      }
      )}
    </div>
  )
}

type Props = { readDict: Dictionary, params: SearchParams }

const Entry = ({ readDict, params }: Props) => {
  const [text, option, range] = [params.text, params.option, params.range]
  const regex = convertQueryToSearchRegex(text, option)
  return (
    <div className='outer'>
      {readDict
        .filter((word) => entryFilter(word, regex, range))
        .sort((a, b) => a.entry.form === b.entry.form ? 0 : a.entry.form > b.entry.form ? 1 : -1)
        .map((word) => {
          const permalinkId = `id${word.entry.id}_${word.entry.form.split(' ').join('_')}`
          return (
            <div className='word' key={word.entry.id}>
              <Form word={word} permalinkId={permalinkId} />
              <Translations word={word} />
              <Contents word={word} />
              <Variations word={word} />
              <Relations word={word} />
            </div>
          )
        })}
    </div>
  )
}

export default Entry