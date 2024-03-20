import image from '../assets/share-chain.svg'
import '../styles/Share.css'

type Props = {
  readUrl: string
}

const Share = ({ readUrl }: Props) => {
  return (
    <img src={image} className='share' onClick={() => {
      navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}?url=${readUrl}`).then(
        () => console.log("successfully copied!"),
        () => { }
      )
    }} />
  )
}

export default Share