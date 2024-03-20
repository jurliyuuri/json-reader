import { Language, dictionaryData } from "../data/dictionaryData"

type Props = {
  lang: Language,
  readUrlSetter: React.Dispatch<React.SetStateAction<string>>
}

const Button = ({lang, readUrlSetter}: Props) => {
  return (
    <button onClick={() =>{readUrlSetter(dictionaryData[lang]["url"])}}>
      {lang}
    </button>
  )
};

export default Button;