# react-lightbox-js

## Install

```bash
npm install --save react-lightbox-js
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactLightbox from 'react-lightbox-js'
import 'react-lightbox-js/dist/index.css'

const imagesArr=[{src:'1.png'},{src:'2.png'}]
const onClose = ()=>{
  // called when onClose method triggers i.e. when modal is closed
}
class Example extends Component {
  const
  render() {
    return <ReactLightbox 
    images={images} 
    imageSrcKey={'src'} 
    imageAltKey={'src'}
    onClose={onClose}
    />
  }
}

'Options':-
  sliderIndex = 0 -> Selected index of slider. Default 0
  images -> Array of images
  imageSrcKey  -> key of image in array object. Provide empty eg. '' if it is simple array. Default src
  imageAltKey  -> image alt key. Default src
  isOpen  -> open or hide modal. Default true
  onClose -> Call back method on close modal of lightbox
  isZoom -> Show or hide zoom feature. Default true
  defaultZoom  -> show image to be zoom when modal opened. Default false
  isEnlarge -> show or hide enlarge screen feature. Default true
  defaultFullScreen = false -> Default screen to be full screen or not. Default false
  zoomValues -> zoom values i.e. values to be image zoom in percent. Note: 1 means 100% 1.5 means 150 percent. Provide values in required format. Default values are ['1', '1.5', '2', '2.5']
  slideAnimationDuration  -> slider animation duration. Default '600ms'
  overlayBackgroundColor -> overlay background color. Default 'rgba(0, 0, 0, 0.5)'
  objectFit -> Image style. Default fill
```

## License

MIT © [Harsh Nahta] (https://github.com/harshnahta)
