import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn } from '../utils'
import { setScene } from '../scene'
import { setBaubleLayer01 } from '../baubles/layer-01'
import { obscure } from '../obscuro'

const scene00 = 'Fade In / DAYS OF YORE'

g.tL.yore = new TL({ defaults: { overwrite: 'auto' } }) // general use global timeline

const setScene00 = (c, n) => {
  g.scene.setting = c
  // Only functions that return a boolean can be included in forCleanUp
  g.scene.forCleanUp[c].yoreTitleClick = setAddOn('#tpTitles', 'click', () => setScene(n))
  g.scene.forCleanUp[c].obscureNextScene = () => obscure(3)

  setBaubleLayer01()

  g.tL.yore.to('#tpTitleScreen', {
    duration: 2,
    onComplete: spinTime,
    opacity: 0,
  })
    .set('#tpTitles', {
      cursor: 'pointer',
    }, '>')

  return true
}

const spinTime = () => {
  gsap.set('#deLorean', {
    rotateX: -108,
    rotateY: 40,
    rotateZ: 0,
    scale: 1.25,
  })
  gsap.to('#deLorean', {
    duration: 10,
    ease: 'none',
    repeat: -1,
    rotateX: 360,
    yoyo: true,
  })
  gsap.to('#deLorean', {
    duration: 20,
    ease: 'none',
    repeat: -1,
    rotateY: 360,
    yoyo: true,
  })
  gsap.to('#deLorean', {
    duration: 30,
    ease: 'none',
    repeat: -1,
    rotateX: 360,
    yoyo: true,
  })
}

export { scene00, setScene00 }
