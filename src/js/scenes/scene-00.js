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

  console.log(g.document.querySelector('#fusionBottomWhite > div > div').getBoundingClientRect())
  return true
}

const spinTime = () => {
  gsap.set('#deLorean', {
    rotateX: -25,
    rotateY: 180,
    rotateZ: 0,
    scale: 1.23,
  })
  gsap.to('#deLorean', {
    duration: 20,
    ease: 'steps(25)',
    repeat: -1,
    rotateX: -90,
    yoyo: true,
  })
  gsap.to('#deLorean', {
    duration: 40,
    ease: 'steps(50)',
    repeat: -1,
    rotateY: 60,
    yoyo: true,
  })
  // gsap.to('#deLorean', {
  //   duration: 30,
  //   ease: 'none',
  //   repeat: -1,
  //   rotateZ: 360,
  //   yoyo: true,
  // })
}

export { scene00, setScene00 }
