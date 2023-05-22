/** @format */
import React, { useEffect } from 'react'
const FullScreen = ({
  styles,
  enlargeBtn,
  reduceBtn,
  enlargeScreen,
  setEnlargeScreen,
  screen,
  transformImage,
  imageBlock
}) => {
  const enlargeReduceScreen = (value) => {
    setEnlargeScreen(value)
  }
  const updateEnlargeCss = (reduce, enlarge) => {
    reduceBtn.current.style.display = reduce
    enlargeBtn.current.style.display = enlarge
  }

  const updateScreen = ({ width, height, top, left }) => {
    screen.current.style.width = width
    screen.current.style.height = height
    screen.current.style.top = top
    screen.current.style.left = left
    transformImage(imageBlock.current, false)
  }
  useEffect(() => {
    if (enlargeScreen === true) {
      updateEnlargeCss('block', 'none')
      updateScreen({
        width: '100%',
        height: '100%',
        top: '0%',
        left: '0%'
      })
    } else {
      updateEnlargeCss('none', 'block')

      updateScreen({
        width: '80%',
        height: '80%',
        top: '10%',
        left: '10%'
      })
    }
  }, [enlargeScreen])
  return (
    <li className={styles.tbI}>
      <button
        onClick={() => enlargeReduceScreen(true)}
        type='button'
        aria-label='Enlarge screen'
        title='Enlarge screen'
        className={`${styles.tbIC} ${styles.btn} ${styles.enImg} ${styles.enBtn}`}
        ref={enlargeBtn}
      />
      <button
        onClick={() => enlargeReduceScreen(false)}
        type='button'
        aria-label='Shrink screen'
        title='Shrink screen'
        className={`${styles.tbIC} ${styles.btn} ${styles.enImg} ${styles.shrinkBtn}`}
        ref={reduceBtn}
      />
    </li>
  )
}

export default FullScreen
