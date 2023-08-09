import React from 'react'
import LoadModal from './features'
import styles from './styles.module.css'

export const ReactLightbox = ({
  sliderIndex = 0,
  images = [],
  imageSrcKey = 'src',
  imageAltKey = 'src',
  isOpen = true,
  onClose = () => {},
  isZoom = true,
  defaultZoom = false,
  isEnlarge = true,
  defaultFullScreen = false,
  zoomValues = ['1', '1.5', '2', '2.5'],
  slideAnimationDuration = '600ms',
  overlayBackgroundColor = 'rgba(0, 0, 0, 0.5)',
  objectFit = 'fill',
  imageBackgroundColor = 'rgba(0, 0, 0, 0.5)'
}) => {
  const getZoomValues = (isArray = false) => {
    try {
      const obj = getObject(zoomValues)
      if (isArray) {
        return zoomValues
      } else {
        return obj
      }
    } catch (e) {
      if (isArray) {
        return ['1', '1.5', '2', '2.5']
      } else {
        const obj = getObject(['1', '1.5', '2', '2.5'])
        return obj
      }
    }
  }
  const getObject = (value) => {
    const obj = {}
    for (let i = 0; i < value.length; i++) {
      if (!isNaN(parseFloat(value[i]))) {
        if (i === 0 && parseFloat(value[i]) > 1) obj[i] = `scale(1)`
        else obj[i] = `scale(${value[i]})`
      } else {
        throw new Error('Invalid Values.')
      }
    }
    return obj
  }
  if (!isOpen) {
    return null
  }

  return (
    <LoadModal
      styles={styles}
      sliderIndex={sliderIndex}
      images={images}
      imageSrcKey={imageSrcKey}
      imageAltKey={imageAltKey}
      onClose={onClose}
      isZoom={isZoom}
      defaultZoom={defaultZoom}
      isEnlarge={isEnlarge}
      defaultFullScreen={defaultFullScreen}
      zoomVal={getZoomValues()}
      zoomLength={zoomValues.length - 1}
      zoomArrayVal={getZoomValues(true)}
      slideAnimationDuration={slideAnimationDuration}
      overlayBackgroundColor={overlayBackgroundColor}
      objectFit={objectFit}
      imageBackgroundColor={imageBackgroundColor}
    />
  )
}
