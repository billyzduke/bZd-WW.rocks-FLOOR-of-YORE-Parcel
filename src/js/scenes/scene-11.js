import { gsap } from 'gsap'

import g from '../glob'
import { setScene, setSubScenes } from '../scene'
import { setSmokes } from '../smoke'
// import { setBaubleLayer03 } from '../baubles/layer-03'
// import { setBaubleLayer04 } from '../baubles/layer-04'

const scene11 = 'Relieve the Lion / Binary Folklore / Breed Foetuses'

const setScene11 = (c, n) => {
  g.scene.setting = c

  // setBaubleLayer03()
  // setBaubleLayer04()

  setSubScenes(c, [ 'foetusL', 'foetusR', 'folklore' ])
  setSmokes()

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
