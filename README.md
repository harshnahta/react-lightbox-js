# react-lightbox-js

## Install

```bash
npm install --save react-lightbox-js
```

## Usage

```jsx
import React, { Component } from 'react'

import LightBoxModal from 'react-lightbox-js'
import 'react-lightbox-js/dist/index.css'

class Example extends Component {
  render() {
    return <LightBoxModal />
  }
}

'Options'`sliderIndex = 0 -> Selected index of slider default 0
  images -> Array of images
  imageSrcKey  -> key of image in array object. Provide empty eg. '' if it is simple array default src
  imageAltKey  -> image alt key default src
  isOpen  -> open or hide modal. Default true
  onClose -> Call back method on close modal of lightbox
  isZoom -> Show or hide zoom feature default true
  defaultZoom  -> show image to be zoom when modal opened. default false
  isEnlarge -> show or hide enlarge screen feature default true
  defaultFullScreen = false -> default screen to be full screen or not. Default false
  zoomValues -> zoom values i.e. values to be image zoom in percent. Note: 1 means 100% 1.5 means 150 percent. Provide values in required format. Default values are ['1', '1.5', '2', '2.5']
  slideAnimationDuration  -> slider animation duration default '600ms'
  overlayBackgroundColor -> overlay background color default 'rgba(0, 0, 0, 0.5)'
  objectFit -> Image style default fill`
```

## License

MIT © [Harsh Nahta] (https://github.com/harshnahta)
