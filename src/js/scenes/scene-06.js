import { gsap, TimelineMax as TL } from 'gsap'

import g from '/src/js/glob'
import { gsapTick, setAddOn, setClearActors } from '/src/js/utils'
import { setScene } from '.'
import { cleanUp } from '../utils'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { spinRing } from '../baubles/layer-01'

const scene06 = 'Spin Gankyil / Spiral Out / The Worm Turns'

const presetScene08 = () => {
  gsap.set( '#gemPulse', {
    opacity: 0,
    scale: 0,
  } )
  gsap.set( '#gemGuy', {
    translateX: 15,
    translateY: 3,
    width: 78,
    height: 102,
    cursor: 'wait',
  } )
  gsap.set( '#raelStar', {
    rotateZ: 360,
    scale: 0,
    translateX: 6.5,
    cursor: 'wait',
  } )
  gsap.set( '#crossMyHeart', {
    rotateZ: -1080,
    scale: 0,
  } )
  return true
}

g.tL.ribs = new TL( { defaults: { overwrite: false } } )
g.tL.stars = new TL( { defaults: { overwrite: false } } )

const shiftSegment = rib => {
  g.tL.ribs.to( `.wormRibs path:nth-of-type(${rib})`, {
    duration: 0.42,
    ease: 'power2.in',
    rotation: '-=0.75',
    transformOrigin: '50% 50%',
  }, '>' )
  g.worm.ribs.which--
  if ( !g.worm.ribs.which ) g.worm.ribs.which = 12
}

const setScene06 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].ctrRingClick = setAddOn( '#ctrRing', 'click', () => setScene( n ) )
  g.scene.forCleanUp[c].spinRingTicker = gsapTick( spinRing )
  let clearDirt = [ () => setClearActors( '#dirtVidWrapper' ) ]
  g.scene.forCleanUp[c].presetFutureScene = () => presetScene08()
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose( 8 )

  gsap.set( '#gankyil', {
    opacity: 1,
    rotateZ: 0,
    scale: 1,
  } )

  if ( g.scene.skip.ff ) {
    if ( g.el.drWorm ) g.el.drWorm.classList.add( 'skip' )
  } else {
    if ( g.bL[1].ctrRing ) flashBulb( g.bL[1].ctrRing )
    if ( g.vid.bronze ) g.vid.bronze.play()
  }

  g.worm.ribs.ntrvl = setInterval( () => {
    shiftSegment( g.worm.ribs.which )
  }, 400 )

  // FIX INITIAL RIB SPACING // very arbitrary stuff, but interim SVGs are MIA
  g.tL.ribs.set( '.wormRibs path:first-of-type, .wormRibs path:nth-of-type(2)', {
    rotation: '-=0.64',
  } )
    .set( '.wormRibs path:nth-of-type(8)', {
      rotation: '+=0.16',
    } )
    .set( '.wormRibs path:nth-of-type(9)', {
      rotation: '+=0.36',
    } )
    .set( '.wormRibs path:nth-of-type(10)', {
      rotation: '+=0.54',
    } )
    .set( '.wormRibs path:nth-of-type(11)', {
      rotation: '+=0.7',
    } )
    .set( '.wormRibs path:nth-of-type(12)', {
      rotation: '+=0.88',
    } )

  // PREP STARFIELDS FOR NEXT SCENE
  g.tL.stars.set( '.wormRing .wormTube .innerSpace .starField', {
    rotation: 'random(0, 360)',
    transformOrigin: '4096px 4096px',
  } )

  if ( g.el.drWorm ) g.el.drWorm.classList.add( 'anim' )

  g.tL.gankyil.to( '#gankyil', {
    duration: 10,
    ease: 'none',
    repeat: -1,
    rotateZ: '+=360',
    overwrite: 'auto',
  } )

  gsap.set( '#dirtVidWrapper', {
    delay: g.scene.skip.ff || 10,
    opacity: 0,
    onComplete: function () {
      clearDirt = cleanUp( clearDirt )
    },
  } )

  if ( g.scene.skip.ff ) setTimeout( () => setScene( n ), 100 )

  return true
}

export { scene06, setScene06 }
