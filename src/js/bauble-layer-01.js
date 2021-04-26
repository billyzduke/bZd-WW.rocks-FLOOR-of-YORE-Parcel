import { gsap } from 'gsap'

import { g } from './glob'
import { setBaublesInLayer } from './baubles'

const setBaubleLayer01 = () => {
  const cR = 69
  const cR02 = cR * 0.2
  // const bbDiam = bDiam * 1.25 // for bL02 +  [ 0, 1, 38, 39 ],

  const bRadii = bDiam / 2
  g.el.bL[1] = setBaublesInLayer(el, 1, 33, {}, true)
  g.el.bL[1].ctrRing = g.el.ctrRing
  g.el.bL[1].ctrRingLightning = []
  g.el.bL[1].zQuickOnSetters = []
  const tgBgAsses = Array.from({ length: 9 }, (_, i) => `src/img/lightningBalls/lightning-ball-0${i + 1}.png`)
  tgBgAsses.forEach((tgBgAss, i) => {
    g.el.bL[1].ctrRingLightning[i] = document.createElement('img')
    g.el.bL[1].ctrRingLightning[i].src = tgBgAss
    g.el.bL[1].ctrRingLightning[i].id = `z${i}`
    g.el.bL[1].ctrRingLightning[i].height = cR * 2
    g.el.bL[1].ctrRingLightning[i].width = g.el.bL[1].ctrRingLightning[i].height
    g.el.bL[1].ctrRingLightning[i].classList.add('z')
    tgBgAsses.forEach((_, z) => {
      if (z !== i) g.el.bL[1].ctrRingLightning[i].classList.add(`z${z}`)
    })
    g.el.bL[1].ctrRing.appendChild(g.el.bL[1].ctrRingLightning[i])
    g.el.bL[1].zQuickOnSetters[i] = gsap.quickSetter(`#${g.el.bL[1].ctrRingLightning[i].id}`, 'css')
  })
  g.el.bL[1].zQuickOffSetter = gsap.quickSetter('.z', 'opacity')
  g.el.bL[1].st = (2 * Math.PI) / g.el.bL[1].b.length
  console.log(g.el.bL)
}

export { setBaubleLayer01 }
