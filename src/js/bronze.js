import { gsap } from 'gsap'
// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

const setBronze = (w, el) => {
  if (el.bronzeCauldron) {
    gsap.set(el.bronzeCauldron, {
      height: w.h,
      maxHeight: '100vh',
      minWidth: '100vw',
      objectFit: 'fill',
      position: 'absolute',
      width: w.w,
    })
    return videojs('bronzeCauldron')
  }
}

export { setBronze }
