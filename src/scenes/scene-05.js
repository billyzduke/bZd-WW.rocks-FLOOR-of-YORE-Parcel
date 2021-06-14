import { gsap, TimelineMax as TL } from 'gsap'

import g from '/src/shared/_'
import { cleanUp, setAddOn, setClearActors } from '/src/shared/utils'
import { setScene } from '/src/scenes/_'
import { flashBulb } from '/src/main-stage/flashbulb/_'
import { obscureGrandiose } from '/src/obscuro/_'
import { resetCtrRingPos2 } from '/src/main-stage/baubles/layer-01/_'

const scene05 = 'Distill Gankyil / Way Down in the Hole'

g.tL.gankyil = new TL( { defaults: { overwrite: 'auto' } } )
g.tL.bronze = new TL( { defaults: { overwrite: 'auto' } } )

const setScene05 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].ctrRingClick = setAddOn( '#ctrRing', 'click', () => setScene( n ) )
  let clearBronze = [ () => setClearActors( '#bronzeVidWrapper' ) ]
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose( 8 )
  resetCtrRingPos2()

  if ( !g.scene.skip.ff ) {
    flashBulb( g.bL[1].ctrRing )
    g.vid.dirt.play()
  } else {
    g.tL.bronze.timeScale( 1 / g.scene.skip.ff )
    g.tL.gankyil.timeScale( 1 / g.scene.skip.ff )
  }

  gsap.set( '.pCC', {
    opacity: 1,
  } )

  g.tL.bronze.to( g.el.bronzeVidWrapper, {
    borderRadius: '50%',
    duration: 0.5,
    ease: 'power4.in',
    scaleX: g.w.h / g.w.w,
  }, '<' )
    .to( '#bronzeVidWrapper > .video-js', {
      duration: 0.5,
      ease: 'power4.in',
      borderRadius: '50%',
    }, '<' )
    .to( g.el.bronzeVidWrapper, {
      duration: 0.5,
      onComplete: function () {
        clearBronze = cleanUp( clearBronze )
      },
      ease: 'power4.out',
      rotateZ: 360,
      scale: 0,
    }, g.scene.skip.ff ? '>' : '<0.5' )

  g.tL.gankyil.fromTo( '#gankyil', {
    opacity: 0,
    scale: 10,
    rotateZ: -720,
  }, {
    delay: 0.25,
    duration: 0.25,
    ease: 'power4.in',
    opacity: 0.23,
  }, '>' )
    .to( '#gankyil', {
      duration: 0.5,
      ease: 'power4.out',
      opacity: 1,
      rotateZ: 0,
      scale: 1,
    }, '>' )

  gsap.to( g.bL[1].bW, {
    duration: g.scene.skip.ff || 0.75,
    ease: 'power3.in',
    rotateZ: 0,
    overwrite: true,
  } )

  if ( g.scene.skip.ff ) g.tL.bronze.call( setScene, [ n ], '>' )

  return true
}

export { scene05, setScene05 }
