import { gsap, TimelineMax as TL } from 'gsap'

import assHandEyeBlinkL from 'url:/src/img/lion/lion-hand-eye-left-blink.gif'
import assHandEyeBlinkR from 'url:/src/img/lion/lion-hand-eye-right-blink.gif'
import g from '../glob'
import { gsapTick, setAddOn } from '../utils'
import { lionShockTick, relieveTheLion, shockTheLion } from '../lion'
import { ex, setExcs } from '../lion-head'
import { setFoetuses } from '../foetuses'
// eslint-disable-next-line object-curly-newline
import { bloodDropL, bloodDropR, sayCeren, sayNothing, saySinan, setBloodSplashes } from '../lion-hands'
import { setRamIconHorns } from '../owl-ram'
import { setFolkLore } from '../folklore'

const scene10 = 'Shock the Lion / Open All Eyes / Release the Owl'

const setScene10 = (c, n) => {
  g.scene.setting = c
  shockTheLion()
  g.scene.forCleanUp[c].lionShockTicker = gsapTick(lionShockTick)

  setFoetuses()
  setBloodSplashes()
  setRamIconHorns()
  setFolkLore()
  setExcs()

  setAddOn('#handEyeLeft, #saySinan', 'mouseenter', saySinan)
  setAddOn('#handEyeLeft, #saySinan', 'mouseleave', sayNothing)
  setAddOn('#saySinan', 'click', bloodDropR)
  setAddOn('#handEyeRight, #sayCeren', 'mouseenter', sayCeren)
  setAddOn('#handEyeRight, #sayCeren', 'mouseleave', sayNothing)
  setAddOn('#sayCeren', 'click', bloodDropL)
  setAddOn('#thirdEyeWrapper', 'click', ex)

  g.qss.ramIconHorns.both[0](1)

  gsap.set('#lionHead', {
    attr: {
      class: 'jarp',
    },
  })
  gsap.set('#thirdEyeClosed', {
    attr: {
      class: 'open',
    },
  })
  g.el.handEyeLeft.src = assHandEyeBlinkL
  g.el.handEyeRight.src = assHandEyeBlinkR
  gsap.set('.handEyeWrapper', {
    attr: {
      class: 'handEyeWrapper open',
    },
  })
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
