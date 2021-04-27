import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { resetCtrRingV2 } from '../baubles/layer-01'

const scene05 = 'Distill Gankyil / Way Down in the Hole'

const setScene05 = () => {
  const bronzeTL = new TL({ defaults: { overwrite: 'auto' } })
  const gankyilTL = new TL({ defaults: { overwrite: 'auto' } })
  g.scene.forCleanUp[5].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(6))

  resetCtrRingV2()

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)
    obscureGrandiose(4)
    g.vid.dirt.play()
  } else {
    bronzeTL.timeScale(1 / g.scene.skip.ff)
    bronzeTL.timeScale(1 / g.scene.skip.ff)
  }

  gsap.set('.pCC', {
    opacity: 1,
  })

  bronzeTL.to(g.el.bronzeVidWrapper, {
    borderRadius: '50%',
    duration: 0.5,
    ease: 'power4.in',
    scaleX: g.w.h / g.w.w,
  }, '<')
    .to('#bronzeVidWrapper > .video-js', {
      duration: 0.5,
      ease: 'power4.in',
      borderRadius: '50%',
    }, '<')
    .to(g.el.bronzeVidWrapper, {
      duration: 0.5,
      ease: 'power4.out',
      rotateZ: 360,
      scale: 0,
    }, g.scene.skip.ff ? '>' : '<0.5')

  gankyilTL.fromTo('#gankyil', {
    opacity: 0,
    scale: 10,
    rotateZ: -720,
  }, {
    delay: 0.25,
    duration: 0.25,
    ease: 'power4.in',
    opacity: 0.23,
  }, '>')
    .to('#gankyil', {
      duration: 0.5,
      ease: 'power4.out',
      opacity: 1,
      rotateZ: 0,
      scale: 1,
    }, '>')
    .set('#gankyil', {
      opacity: 1,
      rotateZ: 0,
      scale: 1,
    }, '<0.5')

  gsap.to(g.bL[1].bW, {
    duration: g.scene.skip.ff || 0.75,
    ease: 'power3.in',
    rotateZ: 0,
    overwrite: true,
  })

  if (g.scene.skip.ff) bronzeTL.call(setScene, [ 6 ], '>')

  return true
}

export { scene05, setScene05 }
