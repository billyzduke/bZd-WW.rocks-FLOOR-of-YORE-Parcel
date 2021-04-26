import { gsap } from 'gsap'
// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

import g from './glob';

const setBronze = () => {
  if (g.el.bronzeCauldron) {
    gsap.set(g.el.bronzeCauldron, {
      height: g.w.h,
      maxHeight: '100vh',
      minWidth: '100vw',
      objectFit: 'fill',
      position: 'absolute',
      width: g.w.w,
    })
    return videojs('bronzeCauldron')
  }
}

export { setBronze }
