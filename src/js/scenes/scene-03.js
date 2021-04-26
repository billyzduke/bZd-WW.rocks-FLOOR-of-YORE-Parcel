import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { gsapTick, setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { resetCtrRing, shockTick } from '../baubles/layer-01'
import { embiggenCrtnMaskTick } from '../curtains'
import { readTheFloor, scrubTheFloor } from '../floor'

const scene03 = 'Reveal Curtain / Floor of Yore'

const setScene03 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  g.crtns.crtnMaskSizeObj = { value: 1080 }
  g.crtns.crtnMaskQuickSetter = gsap.quickSetter('#cc1', 'css')
  g.scene.forCleanUp[3].crtnMaskTicker = gsapTick(embiggenCrtnMaskTick)
  g.scene.forCleanUp[3].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(4))
  g.scene.forCleanUp[3].clearMaskedCrtn = () => setClearActor('#cc1')
  g.scene.forCleanUp[3].clearGrove = () => setClearActor('#grove')
  gsapTick(shockTick)
  setAddOn('#yoreFloor', 'mouseenter', readTheFloor)
  setAddOn('#yoreFloor', 'mouseleave', scrubTheFloor)

  gsap.to(g.crtns.crtnMaskSizeObj, {
    duration: g.scene.skip.dur || 2,
    ease: 'power2.in',
    value: g.w.w * 4,
  })

  resetCtrRing()

  if (!g.scene.skip.dur) {
    flashBulb(g.bL[1].ctrRing)
    obscureGrandiose(2)
  }

  sceneTL.set('#cc0', {
    maskImage: 'none',
  })
    .set('#cc1', {
      opacity: 0.76,
    })
    .to(g.el.yoreFloor, {
      duration: g.scene.skip.dur || 4,
      ease: 'power1.in',
      opacity: 1,
    })
    .from(g.el.yoreFloor, {
      duration: g.scene.skip.dur || 4,
      ease: 'power2.inOut',
      perspective: 0,
      rotateX: 0,
      scaleY: 5,
      translateY: '+=400',
    }, '<')
    .to('#cc1', {
      duration: g.scene.skip.dur || 4,
      opacity: 1,
      WebkitFilter: 'blur(0px)',
      filter: 'blur(0px)',
    }, '<')
    .to('#cc0', {
      duration: g.scene.skip.dur || 2,
      ease: 'none',
      opacity: 1,
    }, g.scene.skip.dur ? '>' : '<2')
    .to('#cc1', {
      duration: g.scene.skip.dur || 2,
      ease: 'none',
      opacity: 0,
    }, '>')
  return true
}

export { scene03, setScene03 }
