import { gsap, TimelineMax as TL } from 'gsap'
import '@google/model-viewer'

// import g from './glob'
import { setFlux } from './flux'
// import {
//   gsapTick, ifFunctionThenCall, randOnum, setAddOn,
// } from './utils'

const setFuture = () => {
  setFlux()
  gsap.set('#future', { opacity: 1 })
}

export { setFuture }
