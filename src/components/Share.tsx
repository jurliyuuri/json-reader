import { useState } from 'react'
import image from '../assets/share-chain.svg'
import '../styles/Share.css'

type Props = {
  readUrl: string
}

const Share = ({ readUrl }: Props) => {
  const [urlToCopy, setUrlToCopy] = useState("")
  return (
    <>
      <img src={image} className='share' onClick={() => {
        const shareUrl = `${window.location.protocol}//${window.location.host}${readUrl ? `?url=${readUrl}` : ""}`
        try {
          throw new Error()
          navigator.clipboard.writeText(shareUrl).then(
            () => console.log("successfully copied!")
          )
        } catch {
          // jurliyuuri.comは現在httpなので必ずこっちに来る
          setUrlToCopy(shareUrl)
          console.log("successful fallback!")
        }
      }} />
      {urlToCopy && <span> url: <a href={urlToCopy}>{urlToCopy}</a></span>}
    </>
  )
}

export default Share