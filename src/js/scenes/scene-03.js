import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { gsapTick, setAddOn, setClearActors } from '../utils'
import { setScene } from '.'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { resetCtrRingPos1, shockTick } from '../baubles/layer-01'
import { embiggenCrtnMaskTick } from '../curtains'
import { readTheFloor, scrubTheFloor, toggleFloor } from '../floor'
import { setBronze } from '../bronze'

const scene03 = 'Reveal Curtain / Floor of Yore'

const setScene03 = (c, n) => {
  g.scene.setting = c
  g.crtns.crtnMaskSizeObj = { value: g.main.h }
  g.crtns.crtnMaskQuickSetter = gsap.quickSetter('#cc1', 'css')
  g.scene.forCleanUp[c].crtnMaskTicker = gsapTick(embiggenCrtnMaskTick)
  g.scene.forCleanUp[c].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(n))
  g.scene.forCleanUp[c].clearMaskedCrtn = () => setClearActors('#cc1')
  g.scene.forCleanUp[c].clearGrove = () => setClearActors('#grove')
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose(4)
  g.tickers.shockTick = gsapTick(shockTick)
  setAddOn('#yoreFloor', 'mouseenter', readTheFloor)
  setAddOn('#yoreFloor', 'mouseleave', scrubTheFloor)

  g.vid.bronze = g.el.bronzeCauldron ? setBronze() : undefined

  gsap.to(g.crtns.crtnMaskSizeObj, {
    duration: g.scene.skip.ff || 2,
    ease: 'power2.in',
    value: g.w.w * 4,
  })

  resetCtrRingPos1()
  toggleFloor()

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)
  }

  g.tL.yore.set('#cc0', {
    maskImage: 'none',
  })
    .set('#cc1', {
      opacity: 0.76,
    })
    .to(g.el.yoreFloor, {
      duration: 4,
      ease: 'power1.in',
      opacity: 1,
    })
    .from(g.el.yoreFloor, {
      duration: 4,
      ease: 'power2.inOut',
      perspective: 0,
      rotateX: 0,
      scaleY: 5,
      translateY: '+=400',
    }, '<')
    .to('#cc1', {
      duration: 4,
      opacity: 1,
      WebkitFilter: 'blur(0px)',
      filter: 'blur(0px)',
    }, '<')
    .to('#cc0', {
      duration: 2,
      ease: 'none',
      opacity: 1,
    }, g.scene.skip.ff ? '>' : '<2')
    .to('#cc1', {
      duration: 2,
      ease: 'none',
      opacity: 0,
    }, '>')

  if (g.scene.skip.ff) g.tL.yore.call(setScene, [ n ], '>')

  return true
}

export { scene03, setScene03 }
