/** @format */

import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";

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
}) => {
  const getZoomValues = () => {
    const obj = {};
    for (let i = 0; i < zoomValues.length; i++)
      obj[i] = `scale(${zoomValues[i]})`;
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
        slideAnimationDuration={slideAnimationDuration}
        overlayBackgroundColor={overlayBackgroundColor}
        objectFit={objectFit}
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
  slideAnimationDuration,
  overlayBackgroundColor,
  objectFit,
}) => {
  const imageBlock = useRef();
  const reduceBtn = useRef();
  const enlargeBtn = useRef();
  const screen = useRef();
  const overlay = useRef();
  const [data, setData] = useState({
    zoomIndex: 0,
    sliderIndex: sliderIndex,
    enlargeScreen: defaultFullScreen === true ? true : false,
    xCursor: 0,
    yCursor: 0,
    xImgEle: 0,
    yImgEle: 0,
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
  }, []);

  useEffect(() => {
    // outeside click event start
    const outSideModalClickEvent = () => {
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
  }, []);

  const zoomAll = (index) => {
    const outerBlock = imageBlock.current.children;
    let i = 0;
    for (const img of outerBlock) {
      img.style.transform = `${zoomVal[index]}`;
      if (index !== 0) {
        if (i !== data.sliderIndex) img.children[0].style.display = "none";
      } else {
        img.children[0].style.display = "block";
      }
      i++;
    }
  };

  const zoomIn = () => {
    setData((preState) => ({
      ...preState,
      zoomIndex:
        preState.zoomIndex < zoomLength
          ? preState.zoomIndex + 1
          : preState.zoomIndex,
    }));
  };

  const zoomOut = () => {
    setData((preState) => ({
      ...preState,
      zoomIndex: preState.zoomIndex !== 0 ? preState.zoomIndex - 1 : 0,
    }));
  };
  useEffect(() => {
    if (isZoom === true) {
      zoomAll(data.zoomIndex);
      transformImage(imageBlock.current, false);
      if (data.zoomIndex === 0) {
        removeListner();
        screen.current.style.cursor = "inherit";
      } else {
        listenerStart();
        screen.current.style.cursor = "move";
      }
    }
  }, [data.zoomIndex]);
  const moveSlide = (key) => {
    const childLength = imageBlock.current.children.length;
    let value = data.sliderIndex;
    if (key === "next") {
      if (childLength - 1 === value) {
        value = 0;
      } else {
        value += 1;
      }
    } else {
      if (value === 0) {
        value = childLength - 1;
      } else {
        value -= 1;
      }
    }
    const obj = {
      sliderIndex: value,
    };
    if (data.zoomIndex !== 0) obj.zoomIndex = 0;
    setData((preState) => ({
      ...preState,
      ...obj,
    }));
  };

  useEffect(() => {
    if (data.sliderIndex >= 0 && data.sliderIndex < images.length) {
      transformImage(imageBlock.current);
      zoomOut();
      window.onresize = () => {
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
  }, [data.sliderIndex]);
  const enlargeReduceScreen = (value) => {
    setData((preState) => ({
      ...preState,
      enlargeScreen: value,
    }));
  };
  useEffect(() => {
    if (data.enlargeScreen === true) {
      if (isEnlarge === true) {
        updateEnlargeCss("block", "none");
      }
      updateScreen({
        width: "100%",
        height: "100%",
        top: "0%",
        left: "0%",
      });
    } else {
      if (isEnlarge === true) {
        updateEnlargeCss("none", "block");
      }
      updateScreen({
        width: "80%",
        height: "80%",
        top: "10%",
        left: "10%",
      });
    }
  }, [data.enlargeScreen]);

  const updateEnlargeCss = (reduce, enlarge) => {
    reduceBtn.current.style.display = reduce;
    enlargeBtn.current.style.display = enlarge;
  };

  const updateScreen = ({ width, height, top, left }) => {
    screen.current.style.width = width;
    screen.current.style.height = height;
    screen.current.style.top = top;
    screen.current.style.left = left;
    transformImage(imageBlock.current, false);
  };
  const startDrag = (event) => {
    if (screen.current.style.cursor === "move") {
      screen.current.imgEle = event;
      screen.current.xImgEle =
        event.clientX - document.getElementById("drag-img").offsetLeft;
      screen.current.yImgEle =
        event.clientY - document.getElementById("drag-img").offsetTop;
    }
  };
  const stopDrag = () => {
    screen.current.imgEle = null;
  };

  const whileDrag = (event) => {
    if (screen.current.style.cursor === "move") {
      const xCursor = event.clientX;
      const yCursor = event.clientY;
      if (screen.current.imgEle !== null) {
        const width = imageBlock.current.clientWidth * data.sliderIndex + 1;
        imageBlock.current.style.transform = `translate3d(${
          xCursor - screen.current.xImgEle - width
        }px, ${yCursor - screen.current.yImgEle}px, 0px)`;
      }
    }
  };
  const listenerStart = () => {
    document
      .getElementById("drag-img")
      .addEventListener("mousedown", startDrag);
    document
      .getElementById("drag-img")
      .addEventListener("mousemove", whileDrag);
    document.getElementById("drag-img").addEventListener("mouseup", stopDrag);
    document
      .getElementById("drag-img")
      .addEventListener("mouseleave", stopDrag);
  };
  const removeListner = () => {
    document
      .getElementById("drag-img")
      .removeEventListener("mousedown", startDrag);
    document
      .getElementById("drag-img")
      .removeEventListener("mousemove", whileDrag);
    document
      .getElementById("drag-img")
      .removeEventListener("mouseleave", stopDrag);
  };
  return (
    <div className={styles.Portal}>
      <div className={styles.Overlay} ref={overlay}>
        <div
          className={styles.Content}
          ref={screen}
          role="dialog"
          aria-label="Lightbox"
          aria-modal="true">
          <div className={styles.customSlider} id="drag-img">
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
            <button
              onClick={() => moveSlide("pre")}
              type="button"
              className={`${styles.navBtn} ${styles.prev}`}
              aria-label="Previous image"
              title="Previous image"
            />
            <button
              onClick={() => moveSlide("next")}
              type="button"
              className={`${styles.navBtn} ${styles.next}`}
              aria-label="Next image"
              title="Next image"
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
                  {!!(isZoom === true) && (
                    <li className={styles.tbI}>
                      <button
                        onClick={() => zoomIn()}
                        type="button"
                        aria-label="Zoom in"
                        title="Zoom in"
                        className={`${styles.tbIC} ${styles.btn} ${styles.zIn}`}
                      />
                    </li>
                  )}
                  {!!(isZoom === true) && (
                    <li className={styles.tbI}>
                      <button
                        onClick={() => zoomOut()}
                        type="button"
                        aria-label="Zoom out"
                        title="Zoom out"
                        className={`${styles.tbIC} ${styles.btn} ${styles.zOut}`}
                      />
                    </li>
                  )}
                  {!!(isEnlarge === true) && (
                    <li className={styles.tbI}>
                      <button
                        onClick={() => enlargeReduceScreen(true)}
                        type="button"
                        aria-label="Enlarge screen"
                        title="Enlarge screen"
                        className={`${styles.tbIC} ${styles.btn} ${styles.enImg} ${styles.enBtn}`}
                        ref={enlargeBtn}
                      />
                      <button
                        onClick={() => enlargeReduceScreen(false)}
                        type="button"
                        aria-label="Shrink screen"
                        title="Shrink screen"
                        className={`${styles.tbIC} ${styles.btn} ${styles.enImg} ${styles.shrinkBtn}`}
                        ref={reduceBtn}
                      />
                    </li>
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
