import { useState } from 'react'
import image from '@/assets/share-chain.svg'
import { SearchParams } from '@/consts/searchParams'
import generateUrlWithQuery from '@/hooks/generateUrlWithQuery'
import useFadeInOut from '@/hooks/useFadeInOut'
import './Share.css'

type Props = {
  readUrl: string,
  searchParams: SearchParams
}

const Share = ({ readUrl, searchParams }: Props) => {
  const [urlToCopy, setUrlToCopy] = useState('')
  const { handleOpen, handleClose, boxStyle } = useFadeInOut(false, 0.5)

  const handleClick = () => {
    const shareUrl = generateUrlWithQuery(readUrl, searchParams)
    try {
      navigator.clipboard.writeText(shareUrl).then(
        () => {
          handleOpen()
          console.log('successfully copied!')
          setTimeout(() => handleClose(), 2500)
        }
      )
    } catch {
      setUrlToCopy(shareUrl)
      console.log('successful fallback!')
    }
  }

  return (
    <div className='share'>
      <div style={boxStyle}><div className='popup'>&#x2714;Copied!</div></div>
      <img src={image} className='share-image' onClick={handleClick} />
      {urlToCopy && <span> url: <a href={urlToCopy}>{urlToCopy}</a></span>}

    </div>
  )
}

export default Share