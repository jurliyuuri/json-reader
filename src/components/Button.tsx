import { Language, dictionaryData } from "../consts/dictionaryData"

type Props = {
  lang: Language,
  setReadUrl: React.Dispatch<React.SetStateAction<string>>
}

const Button = ({ lang, setReadUrl }: Props) => {
  return (
    <button onClick={() => { setReadUrl(dictionaryData[lang]["url"]) }}>
      {lang}
    </button>
  )
};

export default Button;