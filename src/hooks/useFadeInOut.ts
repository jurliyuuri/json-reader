import { CSSProperties, useCallback, useMemo, useState } from "react"

const useFadeInOut = (initDisplay: boolean, durationSec: number) => {
  const [display, setDisplay] = useState(initDisplay)

  const handleClose = useCallback(() => {
    setDisplay(false)
  }, [setDisplay])

  const handleOpen = useCallback(() => {
    setDisplay(true)
  }, [setDisplay])

  const toggleDisplay = useCallback(() => {
    setDisplay((prev) => !prev)
  }, [setDisplay])

  const boxStyle = useMemo((): CSSProperties => {
    if (display) {
      return {
        opacity: 1,
        visibility: "visible",
        transition: `opacity ${durationSec}s`,
      }
    }
    return {
      opacity: 0,
      visibility: "hidden",
      transition: `opacity ${durationSec}s, visibility 0s ${durationSec}s`,
    }
  }, [durationSec, display])

  return { display, handleOpen, handleClose, toggleDisplay, boxStyle }
}

export default useFadeInOut