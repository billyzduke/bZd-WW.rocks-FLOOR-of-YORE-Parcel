import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { gsapTick } from '../utils'
import { lionShockTick, relieveTheLion, shockTheLion } from '../lion'
import { setLionHead } from '../lion-head'
import { setLionHands } from '../lion-hands'
import { setFoetuses } from '../foetuses'
import { setFolkLore } from '../folklore'

const scene10 = 'Shock the Lion / Open All Eyes / Release the Owl'

const setScene10 = (c, n) => {
  g.scene.setting = c
  shockTheLion()
  g.scene.forCleanUp[c].lionShockTicker = gsapTick(lionShockTick)

  setLionHead()
  setLionHands()
  setFoetuses()
  setFolkLore()

  gsap.fromTo('#theOwlIsNotWhatItSeems', {
    translateY: '-=76',
  }, {
    duration: g.scene.skip.ff || 1.42,
    scale: 1,
    translateY: 0,
  })
  gsap.set('#gemGuy, #raelStar, #vajraCross, #heartPulse, #crossMyHeart', {
    cursor: 'no-drop',
  })
  gsap.set('#threshold', {
    opacity: 1,
  })

  const relieveTL = new TL({ defaults: { overwrite: 'auto' } })
  relieveTL.call(relieveTheLion, [], g.scene.skip.ff || 4.242)

  return true
}

export { scene10, setScene10 }
