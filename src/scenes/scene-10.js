import { gsap, TimelineMax as TL } from 'gsap'

import g from '/src/shared/_'
import { gsapTick } from '/src/shared/utils'
import { lionShockTick, relieveTheLion, shockTheLion } from '/src/main-stage/lion/_'
import { setLionHead, toggleLionJarp } from '/src/main-stage/lion/lion-head/_'
import { setLionHands } from '/src/main-stage/lion/lion-torso/lion-hands/_'
import { setFoetuses } from '/src/main-stage/threshold/foetuses/_'
import { setFolkLore } from '/src/main-stage/threshold/two-cows-one-owl/folklore/_'

const scene10 = 'Shock the Lion / Open All Eyes / Release the Owl'

const setScene10 = ( c, n ) => {
  g.scene.setting = c
  shockTheLion()
  g.scene.forCleanUp[c].lionShockTicker = gsapTick( lionShockTick )

  setFoetuses()
  setFolkLore()
  setLionHead()
  setLionHands()
  toggleLionJarp()

  gsap.fromTo( '#theOwlIsNotWhatItSeems', {
    translateY: '-=76',
  }, {
    duration: g.scene.skip.ff || 1.42,
    scale: 1,
    translateY: 0,
  } )
  gsap.set( '#gemGuy, #raelStar, #vajraCross, #heartPulse, #crossMyHeart', {
    cursor: 'no-drop',
  } )
  gsap.set( '#threshold', {
    opacity: 1,
  } )

  gsap.set( '#threshold', {
    delay: g.scene.skip.ff || 6.242,
    onComplete: function () {
      relieveTheLion()
    },
    opacity: 1,
  } )

  return true
}

export { scene10, setScene10 }
