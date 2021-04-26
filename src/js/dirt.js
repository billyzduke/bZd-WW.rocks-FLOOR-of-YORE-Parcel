import { gsap } from 'gsap'
// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

const setDirt = el => {
  if (el.dirtOnTheGround) {
    gsap.set(el.dirtOnTheGround, {
      minHeight: '100vh',
      minWidth: '100vw',
      objectFit: 'cover',
      position: 'absolute',
    })
    return videojs('dirtOnTheGround')
  }
}

export { setDirt }
