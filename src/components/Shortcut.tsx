import { Language, dictionaryData } from '@/consts/dictionaryData'
import { Dispatch, SetStateAction } from 'react'

const Button = ({ lang, setReadUrl }: { lang: Language, setReadUrl: Dispatch<SetStateAction<string>> }) => {
  return (
    <button onClick={() => { setReadUrl(dictionaryData[lang].url) }}>
      {lang}
    </button>
  )
}

const Shortcut = ({ setReadUrl }: { setReadUrl: Dispatch<SetStateAction<string>> }) => {
  return (
    <div>
      {Object.keys(dictionaryData).map((lang) => (
        <Button key={lang} lang={lang as Language} setReadUrl={setReadUrl} />
      ))}
    </div>
  )
}

export default Shortcut