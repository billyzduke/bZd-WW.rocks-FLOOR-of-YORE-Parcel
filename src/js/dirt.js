import { gsap } from 'gsap'
// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

import g from './glob'

const setDirt = () => {
  if (g.el.dirtOnTheGround) {
    gsap.set(g.el.dirtOnTheGround, {
      minHeight: '100vh',
      minWidth: '100vw',
      objectFit: 'cover',
      position: 'absolute',
    })
    return videojs('dirtOnTheGround')
  }
}

export { setDirt }
