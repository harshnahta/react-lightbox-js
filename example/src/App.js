import React, { useState } from 'react'

import { ReactLightbox } from 'react-lightbox-js'
import 'react-lightbox-js/dist/index.css'
const imagesArr = [
  { src: 'https://picsum.photos/200/300' },
  { src: 'https://picsum.photos/100/200' }
]
const App = () => {
  const [isOpen, setState] = useState(true)

  const onClose = () => {
    console.log('here===')
    // called when onClose method triggers i.e. when modal is closed
    setState(false)
  }

  return (
    <>
      <ReactLightbox
        images={imagesArr}
        imageSrcKey={'src'}
        imageAltKey={'src'}
        onClose={onClose}
        isOpen={isOpen}
      />
      <button onClick={() => setState((preState) => !preState)}>
        SHow/Hide
      </button>
    </>
  )
}

export default App
