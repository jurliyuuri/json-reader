import { useState } from 'react'
import generateShareUrl from './generateShareUrl'
import image from '@/assets/share-chain.svg'
import './Share.css'
import { SearchParams } from '@/consts/searchParams'

type Props = {
  readUrl: string,
  searchParams: SearchParams
}

const Share = ({ readUrl, searchParams }: Props) => {
  const [urlToCopy, setUrlToCopy] = useState('')

  const handleClick = () => {
    const shareUrl = generateShareUrl(readUrl, searchParams)
    try {
      navigator.clipboard.writeText(shareUrl).then(
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