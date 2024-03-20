import '../styles/Entry.css'
import { useState } from 'react';
import { Dictionary, Word } from "../models/dictionary"

const Form = (props: { word: Word, permalinkId: string }) => {
  const [show, setShow] = useState(false)
  return (
    <div id={props.permalinkId} onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
      <div className='word-form'>{props.word.entry.form}</div>
      <div className='tags'>
        {props.word.tags.map(tag => <span key={tag} className='bordered-info'>{tag}</span>)}
      </div>
      {show && <a id={`permalink_${props.permalinkId}`} href={props.permalinkId}>¶</a>}
    </div>
  )
}

const Translations = (props: { word: Word }) => {
  return (
    <div className='word-infos'>
      {props.word.translations.map(({ title, forms }) =>
        <p className='word-info' key={`${title}${forms.join("")}`}>
          <span className='bordered-info'>{title}</span>{forms.join(", ")}
        </p>
      )}
    </div>
  )
}

const Contents = (props: { word: Word }) => {
  return (
    <>
      {props.word.contents.map(({ title, text }) =>
        <div className='word-infos' key={`${title}${text}`}>
          <p className='word-info'><span className='nonbordered-info'>{title}</span>{text}</p>
        </div>
      )}
    </>
  )
}

const Variations = (props: { word: Word }) => {
  return (
    <>
      {props.word.variations.map(({ title, text }) =>
        <div className='word-infos' key={`${title}${text}`}>
          <div className='word-info'><span className='nonbordered-info'>{title}</span>{text}</div>
        </div>
      )}
    </>
  )
}

const Relations = (props: { word: Word, permalinkId: string }) => {
  return (
    <div className='word-infos'>
      {props.word.relations.map(({ title, entry }) =>
        <p className='word-info' key={`${title}${entry.form}`}>
          →<span className='bordered-info'>{title}</span><a href={props.permalinkId}>{entry.form}</a>
        </p>
      )}
    </div>
  )
}

const Entry = (props: { readDict: Dictionary }) => {
  return (
    <>
      {props.readDict.words.map((word) => {
        const permalinkId = `#id${word.entry.id}_${word.entry.form.split(" ").join("_")}`
        return (
          <div className='word' key={word.entry.id}>
            <Form word={word} permalinkId={permalinkId} />
            <Translations word={word} />
            <Contents word={word} />
            <Variations word={word} />
            <Relations word={word} permalinkId={permalinkId} />
          </div>
        )
      })}
    </>
  )
}

export default Entry