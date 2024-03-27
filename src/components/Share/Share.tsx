import { useState } from 'react'
import image from '@/assets/share-chain.svg'
import './Share.css'

type Props = {
  readUrl: string
}

const Share = ({ readUrl }: Props) => {
  const [urlToCopy, setUrlToCopy] = useState("")

  const handleClick = () => {
    const shareUrl = `${window.location.protocol}//${window.location.host}/json-reader/${readUrl ? `?url=${readUrl}` : ""}`
    try {
      navigator.clipboard.writeText(shareUrl).then(
        () => console.log("successfully copied!")
      )
    } catch {
      // jurliyuuri.comは現在httpなので必ずこっちに来る
      setUrlToCopy(shareUrl)
      console.log("successful fallback!")
    }
  }

  return (
    <div>
      <img src={image} className='share' onClick={handleClick} />
      {urlToCopy && <span> url: <a href={urlToCopy}>{urlToCopy}</a></span>}
    </div>
  )
}

export default Share