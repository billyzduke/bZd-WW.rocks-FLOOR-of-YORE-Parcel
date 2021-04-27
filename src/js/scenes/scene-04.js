import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { gsapTick, setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { spinRingTick } from '../baubles/layer-01'

const scene04 = 'Raise Curtain / Reveal Cauldron of Bronze'

const setScene04 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  g.scene.forCleanUp[4].spinRingTick = gsapTick(spinRingTick)
  g.scene.forCleanUp[4].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(5))
  g.scene.forCleanUp[4].clearCrtns = () => setClearActor('#curtains')

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)
    obscureGrandiose(4)
    g.vid.bronze.play()
  } else sceneTL.timeScale(1 / g.scene.skip.ff)

  gsap.to(g.bL[1].bW, {
    duration: 64,
    ease: 'none',
    rotateZ: -360,
    repeat: -1,
  })
  gsap.to('#curtains', {
    duration: g.scene.skip.ff || 7,
    ease: 'power2.in',
    translateY: '-110%',
  })
  sceneTL.to('#bronzeVidWrapper .bgVidOverlay.black', {
    duration: 5,
    opacity: 0,
  }, g.scene.skip.ff ? '>' : '<1')

  if (g.scene.skip.ff) sceneTL.call(setScene, [ 5 ], '>')

  return true
}

export { scene04, setScene04 }
