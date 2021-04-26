import { gsap } from 'gsap'

import g from './glob'
import { setBaublesInLayer } from './baubles'

const setBaubleLayer01 = () => {
  const cR = 69
  g.bL[1] = setBaublesInLayer(1, 33, {}, true)
  g.bL[1].ctrRing = g.el.ctrRing
  g.bL[1].ctrRingLightning = []
  g.bL[1].zQuickOnSetters = []
  const tgBgAsses = Array.from({ length: 9 }, (_, i) => `src/img/lightningBalls/lightning-ball-0${i + 1}.png`)
  tgBgAsses.forEach((tgBgAss, i) => {
    g.bL[1].ctrRingLightning[i] = g.document.createElement('img')
    g.bL[1].ctrRingLightning[i].src = tgBgAss
    g.bL[1].ctrRingLightning[i].id = `z${i}`
    g.bL[1].ctrRingLightning[i].height = cR * 2
    g.bL[1].ctrRingLightning[i].width = g.bL[1].ctrRingLightning[i].height
    g.bL[1].ctrRingLightning[i].classList.add('z')
    tgBgAsses.forEach((_, z) => {
      if (z !== i) g.bL[1].ctrRingLightning[i].classList.add(`z${z}`)
    })
    g.bL[1].ctrRing.appendChild(g.bL[1].ctrRingLightning[i])
    g.bL[1].zQuickOnSetters[i] = gsap.quickSetter(`#${g.bL[1].ctrRingLightning[i].id}`, 'css')
  })
  g.bL[1].zQuickOffSetter = gsap.quickSetter('.z', 'opacity')
  g.bL[1].st = (2 * Math.PI) / g.bL[1].b.length
  console.log(g.bL)
}

export { setBaubleLayer01 }
