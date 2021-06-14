import { gsap, TimelineMax as TL } from 'gsap'

import g from '/src/shared/_'
import { gsapTick, setAddOn, setClearActors } from '/src/shared/utils'
import { setScene } from '/src/scenes/_'
import { flashBulb } from '/src/main-stage/flashbulb/_'
import { obscure } from '/src/obscuro/_'
import { flingRingTick } from '/src/main-stage/baubles/layer-01/_'
import { setDirt } from '/src/main-stage/dirt/_'

const scene04 = 'Raise Curtain / Reveal Cauldron of Bronze'

const setScene04 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].flingRingTicker = gsapTick( flingRingTick )
  g.scene.forCleanUp[c].ctrRingClick = setAddOn( '#ctrRing', 'click', () => setScene( n ) )
  g.scene.forCleanUp[c].clearCrtns = () => setClearActors( '#curtains' )
  g.scene.forCleanUp[c].obscureNextScene = () => obscure( 2 )

  g.vid.dirt = g.el.dirtOnTheGround ? setDirt() : undefined

  if ( !g.scene.skip.ff ) {
    flashBulb( g.bL[1].ctrRing )
    g.vid.bronze.play()
  }

  gsap.to( g.bL[1].bW, {
    duration: 64,
    ease: 'none',
    rotateZ: -360,
    repeat: -1,
  } )
  gsap.to( '#curtains', {
    duration: g.scene.skip.ff || 7,
    ease: 'power2.in',
    translateY: '-110%',
  } )
  g.tL.yore.to( '#bronzeVidWrapper .bgVidOverlay.black', {
    duration: 5,
    opacity: 0,
  }, g.scene.skip.ff ? '>' : '<1' )

  if ( g.scene.skip.ff ) g.tL.yore.call( setScene, [ n ], '>' )

  return true
}

export { scene04, setScene04 }
