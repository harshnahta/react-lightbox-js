/** @format */

import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";

import FullScreen from "./features/FullScreen";
import ZoomInOut from "./features/ZoomInOut";
import Slider from "./features/Slider";

const LightBoxModal = ({
  sliderIndex = 0,
  images = [],
  imageSrcKey = "src",
  imageAltKey = "src",
  isOpen = true,
  onClose = () => {},
  isZoom = true,
  defaultZoom = false,
  isEnlarge = true,
  defaultFullScreen = false,
  zoomValues = ["1", "1.5", "2", "2.5"],
  slideAnimationDuration = "600ms",
  overlayBackgroundColor = "rgba(0, 0, 0, 0.5)",
  objectFit = "fill",
  imageBackgroundColor = "rgba(0, 0, 0, 0.5)",
}) => {
  const getZoomValues = (isArray=false) => {
    try {
      const obj = getObject(zoomValues);
      if(isArray){
        return zoomValues
      }else{
        return obj;
      }
    } catch (e) {
      if(isArray){
        return ["1", "1.5", "2", "2.5"]
      }else{
        const obj = getObject(["1", "1.5", "2", "2.5"]);
        return obj;
      }
      
    }
  };
  const getObject = (value) => {
    const obj = {};
    for (let i = 0; i < value.length; i++) {
      if (!isNaN(parseFloat(value[i]))) {
        if (i === 0 && parseFloat(value[i]) > 1) obj[i] = `scale(1)`;
        else obj[i] = `scale(${value[i]})`;
      } else {
        throw new Error("Invalid Values.");
      }
    }
    return obj;
  };
  return (
    isOpen &&
    images.length > 0 && (
      <LoadModal
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
  );
};

const LoadModal = ({
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
}) => {
  const imageBlock = useRef();
  const reduceBtn = useRef();
  const enlargeBtn = useRef();
  const screen = useRef();
  const overlay = useRef();
  const drag = useRef();
  const [data, setData] = useState({
    zoomIndex: 0,
    sliderIndex: sliderIndex,
    xCursor: 0,
    yCursor: 0,
    xImgEle: 0,
    yImgEle: 0,
    enlargeScreen :defaultFullScreen === true ? true : false
  });
 
  const transformImage = (imgBlock, animation = true) => {
    const width = imgBlock.clientWidth * data.sliderIndex + 1;
    imgBlock.style.transform = `translate3d(-${width - 1}px, 0px, 0px)`;
    imgBlock.style["transition-duration"] = `${
      animation ? slideAnimationDuration : "0"
    }`;
    setTimeout(() => {
      imgBlock.style["transition-duration"] = `0ms`;
    }, 300);
  };
  useEffect(() => {
    if (defaultZoom === true) {
      setTimeout(() => {
        setData((preState) => ({
          ...preState,
          zoomIndex: 1,
        }));
      }, 100);
    }
    overlay.current.style["background-color"] = overlayBackgroundColor;
    screen.current.style["background-color"] = imageBackgroundColor;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // outeside click event start
    const outSideModalClickEvent = (event) => {
      // eslint-disable-next-line no-undef
      if (screen && !screen.current?.contains(event.target)) {
        removeListener();
        onClose();
      }
    };
    document.addEventListener("mousedown", outSideModalClickEvent);
    const removeListener = () => {
      document.removeEventListener("mousedown", outSideModalClickEvent);
    };
    // outeside click event end

    return () => {
      removeListener();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (data.sliderIndex >= 0 && data.sliderIndex < images.length) {
      transformImage(imageBlock.current);    
      setData((preState) => ({
        ...preState,
        zoomIndex: 0,
      }));
      window.onresize = () => {
        console.log(window)
        transformImage(imageBlock.current, false);
      };
    } else {
      setData((preState) => ({
        ...preState,
        sliderIndex: 0,
      }));
    }
    return () => {
      window.onresize = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.sliderIndex]);

  return (
    <div className={styles.Portal}>
      <div className={styles.Overlay} ref={overlay}>
        <div
          className={styles.Content}
          ref={screen}
          role="dialog"
          aria-label="Lightbox"
          aria-modal="true">
          <div className={styles.customSlider} ref={drag}>
            {images.length > 0 ? (
              <div className={styles.inner} ref={imageBlock}>
                {images.map((img, index) => {
                  return (
                    <div className={styles.image} key={index}>
                      <img
                        src={imageSrcKey ? img[imageSrcKey] : img}
                        alt={imageAltKey ? img[imageAltKey] : img}
                        draggable="false"
                        style={{
                          objectFit: objectFit,
                        }}
                      />
                    </div>
                  );
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
                    type="button"
                    aria-label="Close"
                    title="Close"
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
                      setEnlargeScreen={(value)=>{
                        setData(preState=>({
                          ...preState,
                          enlargeScreen:value
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
  );
};

export default LightBoxModal;
