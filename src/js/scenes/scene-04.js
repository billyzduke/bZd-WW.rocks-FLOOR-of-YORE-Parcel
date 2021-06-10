import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { gsapTick, setAddOn, setClearActors } from '../utils'
import { setScene } from '.'
import { flashBulb } from '../flashbulb'
import { obscure } from '../obscuro'
import { flingRingTick } from '../baubles/layer-01'
import { setDirt } from '../dirt'

const scene04 = 'Raise Curtain / Reveal Cauldron of Bronze'

const setScene04 = (c, n) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].flingRingTicker = gsapTick(flingRingTick)
  g.scene.forCleanUp[c].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(n))
  g.scene.forCleanUp[c].clearCrtns = () => setClearActors('#curtains')
  g.scene.forCleanUp[c].obscureNextScene = () => obscure(2)

  g.vid.dirt = g.el.dirtOnTheGround ? setDirt() : undefined

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)
    g.vid.bronze.play()
  }

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
  g.tL.yore.to('#bronzeVidWrapper .bgVidOverlay.black', {
    duration: 5,
    opacity: 0,
  }, g.scene.skip.ff ? '>' : '<1')

  if (g.scene.skip.ff) g.tL.yore.call(setScene, [ n ], '>')

  return true
}

export { scene04, setScene04 }
