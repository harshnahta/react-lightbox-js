<!-- @format -->

# react-lightbox-js

## Install

```bash
npm install --save react-lightbox-js
```

# React Lightbox js - User Manual and Updates

Welcome to React Lightbox js! This library empowers you with the flexibility to seamlessly integrate lightbox functionality into your React applications, allowing for manual management and customization based on your unique requirements. With an intuitive interface and a plethora of features, React Lightbox js simplifies the process of creating engaging and interactive image galleries.

## Key Features:

- **Manual Control:** Take charge of your lightbox interactions and tailor them to your needs.
- **Ease of Use:** Effortlessly integrate and configure lightboxes with minimal setup.
- **Performance Enhancements:** The latest version includes performance optimizations to ensure a smooth user experience.
- **Bug Fixes:** We've diligently addressed various bugs to provide a more reliable and stable lightbox solution.
- **imageBackgroundColor:** Customize the background color of your lightbox images to match your design aesthetic.

## Getting Started:

To begin using React Lightbox js, follow these simple steps:

1. Install the package via npm or yarn:

   ```bash
   npm install react-lightbox-js


# React Lightbox js - CodeSandbox Example

Welcome to the React Lightbox js CodeSandbox example! In this sandbox, you can explore and interact with a live implementation of React Lightbox js. This example showcases how to integrate and customize lightbox functionality into a React application.

## Live Example:

Check out the live example on CodeSandbox: [![Live Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-lightbox-js-tqimi2)

## How to Use:

1. Open the [Live Example](https://codesandbox.io/s/react-lightbox-js-tqimi2) on CodeSandbox.
2. Explore the implemented React components and code in the **src** directory.
3. Observe how the lightbox functionality is integrated and how the `imageBackgroundColor` option is used.
4. Make changes and experiment with the code to see how it affects the lightbox behavior and appearance.
5. Feel free to modify and adapt the example to your own projects.


# [react-lightbox-js] - Latest Update

We're thrilled to announce the release of the latest version of [react-lightbox-js]! This update brings a set of significant user interface enhancements and functional fixes to elevate your experience with the package.

**What's New:**

1. **Modal Interaction Improvement:** In response to user feedback, we have diligently addressed an issue that users were encountering when attempting to close or hide modals. With this update, you can expect a smoother and more intuitive modal interaction.

2. **Enhanced Sliding Image Functionality:** We have resolved an issue specifically related to sliding images in the "without zoom" mode. This means you can now seamlessly navigate through images without any disruptions.

We greatly value your input, and your feedback has been invaluable in shaping this update. As we continue to strive for excellence, we encourage you to share your thoughts and suggestions with us.

**Getting Started:**

To take advantage of these improvements, make sure to update your [react-lightbox-js] to the latest version. You can do this by running the following command in your terminal:

  ```bash
  npm update react-lightbox-js
  ```

## How to Use:

```jsx
import React, { Component } from 'react'

import { ReactLightbox } from 'react-lightbox-js'
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
              isOpen={this.state.isOpen}
            />
  }
}
```

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
|  `zoomValues` |  `array`  | ['1', '1.5', '2', '2.5']  | Zoom values i.e. values to be image zoom in percent. Note: 1 means 100% 1.5 means 150 percent. Provide values in required format. **Value on Zero Index should be 1 or below one(i.e. 1,0.9,0.85 etc). If value is greater 1 in Zero Index then it'll be auto converted into default 1** |
|  `slideAnimationDuration` |  `string`  | '600ms'  | Slider animation duration. |
|  `overlayBackgroundColor` |  `string`  | 'rgba(0, 0, 0, 0.5)'  | Overlay background color. **It'll have no effect on full screen mode.** |
|  `objectFit` |  `string`  | `fill`  | Image object property style. i.e. cover,contain,fill etc. |
|  `imageBackgroundColor` |  `string`  | 'rgba(0, 0, 0, 0.5)'  | Background color of image container. This feature is usefull with **objectFit:'contain'** property. |

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
              isOpen = {this.state.isOpen}
              onClose = {onClose}
              isZoom = {true}
              defaultZoom = {false}
              isEnlarge = {true}
              defaultFullScreen = {false}
              zoomValues = {['1', '1.5', '2', '2.5']}
              slideAnimationDuration = {'600ms'}
              overlayBackgroundColor = {'rgba(0, 0, 0, 0.5)'}
              imageBackgroundColor = {'rgba(0, 0, 0, 0.9)'}
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
              isOpen = {this.state.isOpen}
              onClose = {onClose}
              isZoom = {true}
              defaultZoom = {false}
              isEnlarge = {true}
              defaultFullScreen = {false}
              zoomValues = {['1', '1.5', '2', '2.5']}
              slideAnimationDuration = {'600ms'}
              overlayBackgroundColor = {'rgba(0, 0, 0, 0.5)'}
              imageBackgroundColor = {'rgba(0, 0, 0, 0.9)'}
              objectFit = {`fill`}
            />
  }
}

```

## License

MIT © [Harsh Nahta] (https://github.com/harshnahta)
