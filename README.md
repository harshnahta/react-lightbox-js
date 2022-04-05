<!-- @format -->

# react-lightbox-js

## Install

```bash
npm install --save react-lightbox-js
```

**React Lightbox js** gives you the ability to add lightbox functionality which can be managed/customized manually by the user/as per requirement. It is easy to use and comes with many features and more features coming in the future.

## Usage

```jsx
import React, { Component,useState } from 'react'

import ReactLightbox from 'react-lightbox-js'
import 'react-lightbox-js/dist/index.css'

const imagesArr=[{src:'1.png'},{src:'2.png'}]

class Example extends Component {
constructor() {
		super();
		this.state = {
			isOpen: true,
		};
	}
onClose = ()=>{
  // called when onClose method triggers i.e. when modal is closed
  setState({isOpen:false})
}
  render() {
    return <ReactLightbox
    images={imagesArr}
    imageSrcKey={'src'}
    imageAltKey={'src'}
    onClose={onClose}
    isOpen={isOpen}
    />
  }
}

#### Options
|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------ | :------------ | :------------ | :----------------- |
|  `sliderIndex` |  `number`  | 0  | Selected index of slider |
|  `images` |  `array`  | []  | Array of images |
|  `imageSrcKey` |  `string`  | 'src'  | key of image in array object. Provide empty eg. '' if it is simple array |
|  `imageAltKey` |  `string`  | 'src'  | image alt key |
|  `isOpen` |  `boolean`  | true  | open or hide modal. Modal will be opened if this prop is true and to hidemodal update this prop to false |
|  `onClose` |  `method`  | ()=>{}  | Call back method on close modal of lightbox. Use this prop to handle logic to hide modal and any other logic if any. |
|  `isZoom` |  `boolean`  | true  | Show or hide zoom feature.  |
|  `defaultZoom` |  `boolean`  | false  | Show image to be zoom when modal opened |
|  `isEnlarge` |  `boolean`  | true  | Show or hide enlarge screen feature. |
|  `defaultFullScreen` |  `boolean`  | false  | Default screen to be full screen or not. |
|  `zoomValues` |  `array`  | ['1', '1.5', '2', '2.5']  | Zoom values i.e. values to be image zoom in percent. Note: 1 means 100% 1.5 means 150 percent. Provide values in required format. |
|  `slideAnimationDuration` |  `string`  | '600ms'  | Slider animation duration. |
|  `overlayBackgroundColor` |  `string`  | 'rgba(0, 0, 0, 0.5)'  | Overlay background color. |
|  `objectFit` |  `string`  | `fill`  | Image object property style. i.e. cover,contain,fill etc. |
```

#### Example first: images having keys in array

```js
class Example extends Component {
constructor() {
		super();
		this.state = {
			isOpen: true,
		};
	}
onClose = ()=>{
  // called when onClose method triggers i.e. when modal is closed
  setState({isOpen:false})
}
  render() {
    return <ReactLightbox
              sliderIndex = {0}
              images = {[{src:'1.png'},{src:'2.png'}]}
              imageSrcKey = {'src'}
              imageAltKey = {'src'}
              isOpen = {true}
              onClose = {onClose}
              isZoom = {true}
              defaultZoom = {false}
              isEnlarge = {true}
              defaultFullScreen = {false}
              zoomValues = {['1', '1.5', '2', '2.5']}
              slideAnimationDuration = {'600ms'}
              overlayBackgroundColor = {'rgba(0, 0, 0, 0.5)'}
              objectFit = {`fill`}
            />
  }
}

```

#### Example two: images having simple array

```js
class Example extends Component {
constructor() {
		super();
		this.state = {
			isOpen: true,
		};
	}
onClose = ()=>{
  // called when onClose method triggers i.e. when modal is closed
  setState({isOpen:false})
}
  render() {
    return <ReactLightbox
              sliderIndex = {0}
              images = {['1.png','2.png']}
              imageSrcKey = {''}
              imageAltKey = {''}
              isOpen = {true}
              onClose = {onClose}
              isZoom = {true}
              defaultZoom = {false}
              isEnlarge = {true}
              defaultFullScreen = {false}
              zoomValues = {['1', '1.5', '2', '2.5']}
              slideAnimationDuration = {'600ms'}
              overlayBackgroundColor = {'rgba(0, 0, 0, 0.5)'}
              objectFit = {`fill`}
            />
  }
}

```

## License

MIT © [Harsh Nahta] (https://github.com/harshnahta)
