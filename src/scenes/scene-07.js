import { gsap } from 'gsap'

import g from '/src/shared/_'
import { gsapTick, setAddOn } from '/src/shared/utils'
import { setScene } from '/src/scenes/_'
import { flashBulb } from '/src/main-stage/flashbulb/_'
import { obscureGrandiose } from '/src/obscuro/_'
import { orbitRing } from '/src/main-stage/baubles/layer-01/_'
import { setJungle } from '/src/main-stage/jungle/_'
import { shiftStars } from '/src/main-stage/shai-hulud/inner-space/_'

const scene07 = 'Explicitly Orbital / Cosmic Digestion'

const setScene07 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].ctrRingClick = setAddOn( '#ctrRing', 'click', () => setScene( n ), 'pointer', false )
  g.scene.forCleanUp[c].orbitRingTicker = gsapTick( orbitRing )
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose( 5 )

  setJungle()

  if ( !g.scene.skip.ff ) {
    flashBulb( g.bL[1].ctrRing )
    g.worm.stars.ntrvl = setInterval( shiftStars, 4000 )

    gsap.to( '#solarCorona', {
      duration: 30,
      ease: 'none',
      repeat: -1,
      rotateZ: '+=360',
      overwrite: 'auto',
    } )
  }

  gsap.to( '.wormRing .wormTube .innerSpace', {
    duration: g.scene.skip.ff || 3,
    ease: 'power1.in',
    opacity: 1,
    stagger: -1.25,
  } )
  g.tL.gankyil.to( '#gankyil', {
    duration: 5,
    ease: 'none',
    repeat: -1,
    rotateZ: '+=360',
    overwrite: 'auto',
  } )
  gsap.to( '#solarCorona', {
    duration: g.scene.skip.ff || 2.5,
    opacity: 1,
    scale: 1,
  } )
  gsap.to( g.el.wormSignScreen, {
    duration: g.scene.skip.ff || 9,
    ease: 'power1.in',
    onComplete() {
      if ( g.el.wormSignScreen ) {
        // THIS IS TO CORRECT SOME RANDOM BUGGINESS WITH THE mix-blend-mode: overlay ON wormSignScreen
        const wrmScr = g.el.wormSignScreen.cloneNode( true )
        const main = g.el.wormSignScreen.parentNode
        main.removeChild( g.el.wormSignScreen )
        g.el.wormSignScreen = wrmScr
        main.appendChild( g.el.wormSignScreen )
      }
    },
    scale: 1,
  } )
  gsap.to( g.bL[1].bW, {
    duration: g.scene.skip.ff || 2,
    ease: 'power2.inOut',
    rotateZ: -30,
  } )

  if ( g.scene.skip.ff ) setTimeout( () => setScene( n ), 100 )

  return true
}

export { scene07, setScene07 }
