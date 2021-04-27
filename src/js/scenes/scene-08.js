import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn, setClearActors, setClearInterval } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { setBaubleLayer02 } from '../baubles/layer-02'

const scene08 = 'Sparks Fly / Enter the Lion / Reveal Disco Wall'

const setScene08 = (c, n) => {
  g.scene.forCleanUp[c].gankyilClick = setAddOn('#gankyil', 'click', () => setScene(n))
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose(5)
  g.scene.forCleanUp[c].clearWormRibsNtrvl = () => setClearInterval(g.worm.ribs.ntrvl)
  g.scene.forCleanUp[c].clearWormStarsNtrvl = () => setClearInterval(g.worm.stars.ntrvl)
  g.scene.forCleanUp[c].clearActors = setClearActors('#drWorm, #wormSignScreen, #solarCorona, #circlingSparks')

  setBaubleLayer02()

  g.el.theLion.classList.add('anim')
  g.lion.eyes.active = true

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)

    gsap.to('#solarCorona', {
      duration: 30,
      ease: 'none',
      repeat: -1,
      rotateZ: '+=360',
      overwrite: 'auto',
    })
  }

  return false
}

export { scene08, setScene08 }
