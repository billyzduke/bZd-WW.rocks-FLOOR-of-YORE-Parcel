import { gsap } from 'gsap'

import g from '../glob'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'

const scene11 = 'Relieve the Lion / Lightning Rods Off'

const setScene11 = (c, n) => {
  g.lion.blur2X({
    opacity: 0,
  })
  gsap.set('.lightningRod', {
    opacity: 0,
  })

  g.el.threshold.classList.add('anim')

  if (g.scene.skip.ff) setTimeout(() => setScene(n), 100)

  return true
}

export { scene11, setScene11 }
