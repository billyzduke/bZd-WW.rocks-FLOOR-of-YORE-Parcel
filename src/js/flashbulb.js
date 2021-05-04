import { gsap, TimelineMax as TL } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import g from './glob'

gsap.registerPlugin(MotionPathPlugin)

const positionBulb = (elTarget, yOffPx = 0) => {
  if (elTarget) {
    const matrix = MotionPathPlugin.getGlobalMatrix(elTarget)
    const rect = elTarget.getBoundingClientRect()
    const localPoint = { x: rect.left + (rect.width / (g.main.scale * 2)) + 3, y: rect.top + (rect.height / (g.main.scale * 2)) - yOffPx - 3 }
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
  if (!g.scene.skip.ff) {
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
