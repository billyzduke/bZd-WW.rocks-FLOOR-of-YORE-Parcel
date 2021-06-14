import { gsap } from 'gsap'

import g from '/src/shared/_'

const setGlitches = () => {
  gsap.set( '.colorBars', {
    width: ( 42 / 112 ) * g.main.h,
  } )
}

const setHorzNoise = () => {
  g.qss.horzNoise = []
  for ( let sl = 1; sl <= 3; sl++ ) {
    g.qss.horzNoise.push( gsap.quickSetter( `#horzNoise > div:nth-child(${sl})`, 'css' ) )
  }
  console.log( { gQssHorzNoise: g.qss.horzNoise } )
}

export { setGlitches, setHorzNoise }
