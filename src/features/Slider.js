/** @format */
import React from 'react'
const Slider = ({ styles, imageBlock, sliderIndex, zoomIndex, setData }) => {
  const moveSlide = (key) => {
    const childLength = imageBlock.current.children.length
    let value = sliderIndex
    if (key === 'next') {
      if (childLength - 1 === value) {
        value = 0
      } else {
        value += 1
      }
    } else {
      if (value === 0) {
        value = childLength - 1
      } else {
        value -= 1
      }
    }
    const obj = {
      sliderIndex: value
    }
    if (zoomIndex !== 0) obj.zoomIndex = 0
    setData((preState) => ({
      ...preState,
      ...obj
    }))
  }

  return (
    <React.Fragment>
      <button
        onClick={() => moveSlide('pre')}
        type='button'
        className={`${styles.navBtn} ${styles.prev}`}
        aria-label='Previous image'
        title='Previous image'
      />
      <button
        onClick={() => moveSlide('next')}
        type='button'
        className={`${styles.navBtn} ${styles.next}`}
        aria-label='Next image'
        title='Next image'
      />
    </React.Fragment>
  )
}
export default Slider
