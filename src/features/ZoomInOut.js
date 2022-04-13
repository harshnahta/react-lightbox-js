/** @format */
import { useEffect } from "react";
const ZoomInOut = ({
  styles,
  zoomLength,
  imageBlock,
  zoomVal,
  sliderIndex,
  screen,
  transformImage,
  zoomIndex,
  setData,
  element,
  enlargeScreen,
  zoomArrayVal,
}) => {
  const evt = element.current.addEventListener;
  const rmEvt = element.current.removeEventListener;
  const elt = element.current;
  const stopDrag = () => {
    mouseUpHandler();
  };

  const mouseDownHandler = function (e) {
    if (elt.zoomIndex !== 0) {
      elt.pos = {
        left: elt.scrollLeft,
        top: elt.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };
      // Change the cursor and prevent user from selecting the text
      elt.style.cursor = "grabbing";
      elt.style.userSelect = "none";
      if (enlargeScreen === true) {
        elt.style.height = "103vh";
      }
      evt("mousemove", mouseMoveHandler);
      evt("mouseup", mouseUpHandler);
      evt("mouseleave", stopDrag);
      evt("touchmove", mouseMoveHandler);
      evt("touchend", mouseUpHandler);
    }
  };

  const mouseMoveHandler = function (e) {
    if (elt.zoomIndex !== 0 && element && elt.pos && elt.pos.x) {
      // How far the mouse has been moved
      const dx = e.clientX - elt.pos.x;
      const dy = e.clientY - elt.pos.y;
      // Scroll the element
      elt.scrollTop = elt.pos.top - dy;
      elt.scrollLeft = elt.pos.left - dx;
    }
  };
  const mouseUpHandler = function () {
    if (elt.zoomIndex !== 0) {
      elt.pos = null;
      elt.style.cursor = "grab";
      elt.style.removeProperty("user-select");
    }
  };
  const updEleVal = (ele, top, left, pos, pad, isTop = false) => {
    ele.style.position = pos;
    if (isTop) ele.style.top = top;
    else ele.style.bottom = top;
    ele.style.right = left;
    ele.style.padding = pad;
  };
  const updNav = (ele, pos, left, isLeft = false) => {
    ele.style.position = pos;
    if (isLeft) ele.style.left = left;
    else ele.style.right = left;
  };
  const resetScrollPost = () => {
    elt.scrollTop = 0;
    elt.scrollLeft = 0;
  };
  const listenerStart = () => {
    const leftValue = screen.current.style.left;
    const topValue = screen.current.style.top;
    const tb = document.getElementsByClassName(styles.tb);
    elt.style.overflow = "scroll";
    elt.style.height = "100vh";
    updEleVal(tb[0], topValue, leftValue, "fixed", "3px", true);
    updEleVal(tb[1], topValue, leftValue, "fixed", "3px");
    updNav(elt.children[1], "fixed", leftValue, true);
    updNav(elt.children[2], "fixed", leftValue, false);

    evt("mousedown", mouseDownHandler);
    evt("touchstart", mouseDownHandler);
  };

  const removeListner = () => {
    elt.style.cursor = "inherit";
    elt.style.overflow = "hidden";
    elt.style.height = "100%";
    resetScrollPost();
    const tb = document.getElementsByClassName(styles.tb);
    updEleVal(tb[0], "3px", "3px", "absolute", "0", true);
    updEleVal(tb[1], "3px", "3px", "absolute", "0");
    updNav(elt.children[1], "absolute", "0", true);
    updNav(element.current.children[2], "absolute", "0", false);

    rmEvt("mousemove", mouseMoveHandler);
    rmEvt("mouseup", mouseUpHandler);
    rmEvt("mouseleave", stopDrag);
    rmEvt("mousedown", mouseDownHandler);
  };
  const zoom = (key) => {
    let index = 0;
    if (key === "+") {
      index = zoomIndex < zoomLength ? zoomIndex + 1 : zoomIndex;
    } else {
      index = zoomIndex !== 0 ? zoomIndex - 1 : 0;
    }
    setData((preState) => ({
      ...preState,
      zoomIndex: index,
    }));
  };

  const zoomAll = (index) => {
    const outerBlock = imageBlock.current.children;
    const val = zoomVal[index];
    outerBlock[sliderIndex].style.transform = `${val}`;
    let zVal = parseFloat(val.replace("scale(", "").replace(")", ""));
    let i = 0;
    for (const img of outerBlock) {
      if (index !== 0) {
        if (i !== sliderIndex) img.children[0].style.visibility = "hidden";
      } else {
        img.children[0].style.visibility = "visible";
      }
      if (zVal >= 1) {
        img.children[0].style.width = `${zVal * 100}%`;
        img.children[0].style.height = `${zVal * 100}%`;
      }
      i++;
    }
  };
  useEffect(() => {
    zoomAll(zoomIndex);
    transformImage(imageBlock.current, false);
    elt.zoomIndex = zoomIndex;
    if (zoomIndex === 0) {
      removeListner();
      screen.current.style.cursor = "inherit";
    } else {
      listenerStart();
      screen.current.style.cursor = "grab";
      if (enlargeScreen === true) {
        elt.style.height = "100vh";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomIndex]);
  useEffect(() => {
    setData((preState) => ({
      ...preState,
      zoomIndex: 0,
    }));
  }, [enlargeScreen, setData]);
  return (
    <>
      <li className={styles.tbI}>
        <button
          onClick={() => zoom("+")}
          type="button"
          aria-label="Zoom in"
          title="Zoom in"
          className={`${styles.tbIC} ${styles.btn} ${styles.zIn}`}
        />
      </li>

      <li className={styles.tbI}>
        <button
          onClick={() => zoom("-")}
          type="button"
          aria-label="Zoom out"
          title="Zoom out"
          className={`${styles.tbIC} ${styles.btn} ${styles.zOut}`}
        />
      </li>
    </>
  );
};

export default ZoomInOut;
