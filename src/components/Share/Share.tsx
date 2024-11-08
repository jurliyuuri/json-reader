import { useState } from 'react'
import generateUrlWithQuery from '../../hooks/generateUrlWithQuery'
import image from '@/assets/share-chain.svg'
import './Share.css'

const Share = () => {
  const [urlToCopy, setUrlToCopy] = useState('')

  const handleClick = () => {
    const shareUrl = generateUrlWithQuery()
    try {
      if (isDevMode()) {
        throw new Error()
      }
      navigator.clipboard.writeText(shareUrl).then(
        // ここでポップアップを出したい
        () => console.log('successfully copied!')
      )
    } catch {
      setUrlToCopy(shareUrl)
      console.log('successful fallback!')
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