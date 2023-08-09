import React, { useEffect, useState, useRef } from 'react'
import FullScreen from './FullScreen'
import ZoomInOut from './ZoomInOut'
import Slider from './Slider'

const LoadModal = (props) => {
  const {
    styles,
    sliderIndex = 0,
    images = [],
    imageSrcKey,
    imageAltKey,
    onClose,
    isZoom,
    defaultZoom,
    isEnlarge,
    defaultFullScreen,
    zoomVal,
    zoomLength,
    zoomArrayVal,
    slideAnimationDuration,
    overlayBackgroundColor,
    objectFit,
    imageBackgroundColor
  } = props
  const imageBlock = useRef()
  const reduceBtn = useRef()
  const enlargeBtn = useRef()
  const screen = useRef()
  const overlay = useRef()
  const drag = useRef()
  const [data, setData] = useState({
    zoomIndex: 0,
    sliderIndex: sliderIndex,
    xCursor: 0,
    yCursor: 0,
    xImgEle: 0,
    yImgEle: 0,
    enlargeScreen: defaultFullScreen === true
  })

  const transformImage = (imgBlock, animation = true) => {
    const width = imgBlock.clientWidth * data.sliderIndex + 1
    imgBlock.style.transform = `translate3d(-${width - 1}px, 0px, 0px)`
    imgBlock.style['transition-duration'] = `${
      animation ? slideAnimationDuration : '0'
    }`
    setTimeout(() => {
      imgBlock.style['transition-duration'] = `0ms`
    }, 300)
  }
  useEffect(() => {
    if (defaultZoom === true) {
      setTimeout(() => {
        setData((preState) => ({
          ...preState,
          zoomIndex: 1
        }))
      }, 100)
    }
    overlay.current.style['background-color'] = overlayBackgroundColor
    screen.current.style['background-color'] = imageBackgroundColor
  }, [])

  useEffect(() => {
    // outeside click event start
    const outSideModalClickEvent = (event) => {
      // eslint-disable-next-line no-undef
      if (screen && !screen.current?.contains(event.target)) {
        removeListener()
        onClose()
      }
    }
    document.addEventListener('mousedown', outSideModalClickEvent)
    const removeListener = () => {
      document.removeEventListener('mousedown', outSideModalClickEvent)
    }
    // outeside click event end

    return () => {
      removeListener()
    }
  }, [])

  useEffect(() => {
    if (data.sliderIndex >= 0 && data.sliderIndex < images.length) {
      transformImage(imageBlock.current)
      setData((preState) => ({
        ...preState,
        zoomIndex: 0
      }))
      window.onresize = () => {
        transformImage(imageBlock.current, false)
      }
    } else {
      setData((preState) => ({
        ...preState,
        sliderIndex: 0
      }))
    }
    return () => {
      window.onresize = null
    }
  }, [data.sliderIndex])

  return (
    <div className={styles.Portal}>
      <div className={styles.Overlay} ref={overlay}>
        <div
          className={styles.Content}
          ref={screen}
          role='dialog'
          aria-label='Lightbox'
          aria-modal='true'
        >
          <div className={styles.customSlider} ref={drag}>
            {images.length > 0 ? (
              <div className={styles.inner} ref={imageBlock}>
                {images.map((img, index) => {
                  return (
                    <div className={styles.image} key={index}>
                      <img
                        src={imageSrcKey ? img[imageSrcKey] : img}
                        alt={imageAltKey ? img[imageAltKey] : img}
                        draggable='false'
                        style={{
                          objectFit: objectFit
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>
                <h1>Images not availabe!</h1>
              </div>
            )}

            <Slider
              styles={styles}
              imageBlock={imageBlock}
              sliderIndex={data.sliderIndex}
              zoomIndex={data.zoomIndex}
              setData={setData}
            />
            <div className={`${styles.tb} ${styles.tbT}`}>
              <ul className={`${styles.tbSide} ${styles.tbRS}`}>
                <li className={styles.tbI}>
                  <button
                    type='button'
                    aria-label='Close'
                    title='Close'
                    className={`${styles.tbIC} ${styles.btn} ${styles.cBtn}`}
                    onClick={() => onClose()}
                  />
                </li>
              </ul>
            </div>
            {(isZoom === true || isEnlarge === true) && (
              <div className={`${styles.tb} ${styles.tbBottom}`}>
                <ul className={`${styles.tbSide} ${styles.tbRS}`}>
                  {!!(isZoom === true && drag && drag.current) && (
                    <ZoomInOut
                      styles={styles}
                      zoomLength={zoomLength}
                      imageBlock={imageBlock}
                      zoomVal={zoomVal}
                      sliderIndex={data.sliderIndex}
                      screen={screen}
                      transformImage={transformImage}
                      zoomIndex={data.zoomIndex}
                      setData={setData}
                      element={drag}
                      enlargeScreen={data.enlargeScreen}
                      zoomArrayVal={zoomArrayVal}
                    />
                  )}
                  {!!(isEnlarge === true) && (
                    <FullScreen
                      styles={styles}
                      enlargeBtn={enlargeBtn}
                      reduceBtn={reduceBtn}
                      enlargeScreen={data.enlargeScreen}
                      setEnlargeScreen={(value) => {
                        setData((preState) => ({
                          ...preState,
                          enlargeScreen: value
                        }))
                      }}
                      screen={screen}
                      transformImage={transformImage}
                      imageBlock={imageBlock}
                    />
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadModal
