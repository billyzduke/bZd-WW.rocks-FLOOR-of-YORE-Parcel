import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn } from '../utils'
import { setScene } from '.'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { resetCtrRingPos1 } from '../baubles/layer-01'
// import { setBaubleLayer02 } from '../baubles/layer-02'
import { clearShaiHulud } from '../shai-hulud'
import { setJungleMotion } from '../jungle'
import { toggleLionEyes, toggleLionHalos } from '../lion-head'

const scene08 = 'Sparks Fly / Enter the Lion / The Mighty Jungle'

const setScene08 = (c, n) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].gankyilClick = setAddOn('#gankyil', 'click', () => setScene(n))
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose(5)

  // setBaubleLayer02()
  resetCtrRingPos1(5.75)
  toggleLionEyes()
  toggleLionHalos()

  if (g.scene.skip.ff) {
    g.tL.bronze.timeScale(1 / g.scene.skip.ff)
    g.tL.ribs.timeScale(1 / g.scene.skip.ff)
  } else {
    g.tL.bronze.timeScale(1)
    flashBulb(g.bL[1].ctrRing)
  }

  gsap.to('#circlingSparks', {
    duration: 0.75,
    ease: 'none',
    repeat: -1,
    rotateZ: 360,
  })
  gsap.set('#bL01', {
    pointerEvents: 'none',
  })
  gsap.set('#lolf01', {
    cursor: 'wait',
  })
  g.tL.ribs.to('.wormRing', {
    duration: 2,
    ease: 'power4.in',
    filter: 'blur(100px)',
    opacity: 0,
    stagger: {
      each: 0.42,
    },
    overwrite: 'auto',
  })
    .to('.wormRibs', {
      duration: 0.75,
      ease: 'power4.in',
      opacity: 0,
      stagger: {
        each: 0.23,
      },
    }, '<1')
  g.tL.yore.to('#solarCorona', {
    duration: 5,
    ease: 'power3.in',
    opacity: 0,
    scale: 0,
  })
    .to('#circlingSparks', {
      duration: 1.5,
      scale: 1.42,
    }, '<')
    .to(g.el.theLion, {
      duration: 7,
      ease: 'power3.out',
      onComplete: setJungleMotion,
      rotation: 0,
      scale: 1,
    }, '<')
    .to('#lionBlur1', {
      duration: 4,
      ease: 'power3.out',
      opacity: 0,
    }, '<3')
    .to('#circlingSparks', {
      duration: 4,
      ease: 'power3.in',
      opacity: 0,
      scale: 0,
    }, '<0.25')
    .set('#circlingSparks', {
      rotateZ: 0,
    }, '>')
    .set('#lolf01', {
      cursor: 'auto',
    })
  gsap.to(g.bL[1].bW, {
    duration: g.scene.skip.ff || 2,
    ease: 'power2.inOut',
    rotateZ: 0,
  })
  g.tL.bronze.to(g.el.wormSignScreen, {
    duration: 7,
    ease: 'power1.out',
    onComplete: clearShaiHulud,
    scale: 0,
  })

  if (g.scene.skip.ff) g.tL.bronze.call(setScene, [ n ], '>')

  return true
}

export { scene08, setScene08 }
