import { gsap, TimelineMax as TL } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import g from './glob'

const positionBulb = (elTarget, yOffPx = 0) => {
  if (elTarget) {
    const matrix = MotionPathPlugin.getGlobalMatrix(elTarget)
    const localPoint = { x: elTarget.getBoundingClientRect().width / 2 - 69, y: elTarget.getBoundingClientRect().height / 2 - 69 - yOffPx }
    const globalPoint = matrix.apply(localPoint)
    gsap.set('#flashBulbWrapper', {
      x: globalPoint.x,
      y: globalPoint.y,
    })
  }
}

const flashBulb = (elTarget, yOffPx = 0) => {
  if (elTarget) positionBulb(elTarget, yOffPx)
  const flashTL = new TL({ defaults: { overwrite: 'auto' } })
  if (!g.scene.skip.dur) {
    flashTL.set('#flashBulbWrapper', {
      opacity: 1,
      scale: 0,
    })
      .to('#flashBulbWrapper', {
        duration: 0.05,
        scale: 2.5,
      }, '>')
      .to('#flashBulbWrapper', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
      }, '>')
  }
}

export { flashBulb }
