import React from 'react'
import { Language, dictionaryData } from '@/consts/dictionaryData'

const Button = ({ lang, setReadUrl }: { lang: Language, setReadUrl: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <button onClick={() => { setReadUrl(dictionaryData[lang]['url']) }}>
      {lang}
    </button>
  )
}

const Shortcut = ({ setReadUrl }: { setReadUrl: React.Dispatch<React.SetStateAction<string>> }) => {
  return <div>
    <Button lang='ail' setReadUrl={setReadUrl} />
    <Button lang='takan' setReadUrl={setReadUrl} />
    <Button lang='bhat' setReadUrl={setReadUrl} />
    <Button lang='pmcf' setReadUrl={setReadUrl} />
    <Button lang='calass' setReadUrl={setReadUrl} />
    <Button lang='vic' setReadUrl={setReadUrl} />
    <Button lang='ʁa:v' setReadUrl={setReadUrl} />
  </div>
}

export default Shortcut