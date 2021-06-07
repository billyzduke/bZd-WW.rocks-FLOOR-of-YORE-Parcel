import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import g from './glob'
import { setFlux } from './flux'
import {
  gsapTick, randOnum, setAddOn, toggleFermata,
} from './utils'

gsap.registerPlugin( TextPlugin )

const setFuture = () => {
  g.tL.bttf = new TL( { defaults: { overwrite: 'auto' } } )
  g.qss.wormHoler = gsap.quickSetter( '#blindingFlash', 'css' )
  setFlux()
  gsap.set( '#future', { opacity: 1 } )
}

const wormHoleHexes = [
  'f8f8f8',
  'fff7f7',
  'f7efef',
  'efe7f5',
  'eadaee',
  'e8ccee',
  'd7bbed',
  'eef7fb',
  'a5adf7',
  'd8bcf8',
  '877bae',
  'ffffff',
]

const wormHoleFlashTick1 = () => {
  const o = randOnum( 1, 100 )
  const c = randOnum( 0, 11 )
  g.qss.wormHoler( {
    opacity: o < 56 ? 0 : o,
    backgroundColor: wormHoleHexes[c],
  } )
}

const wormHoleFlashTick2 = () => {
  const c = randOnum( 0, 11 )
  g.qss.wormHoler( {
    opacity: 1,
    backgroundColor: wormHoleHexes[c],
  } )
}

const prepDeLorean = () => {
  if ( !g.three.mkr.prepped ) {
    gsap.set( '#glitch01', { opacity: 1 } )
    g.three.on = true
    g.three.mkr.startRendering()
  }
}

const startDeLorean = () => {
  if ( !g.three.on ) {
    g.el.deLorean.style.opacity = 1
    g.el.deLorean.style.left = 0
    g.three.on = true
    // g.three.mkr.io = undefined
    g.three.cleanUp = setAddOn( '#deLorean', 'click', toggleFlyAlongPath )
    g.three.mkr.startRendering()
  } else {
    console.log( { alreadyOn: g.three.on } )
  }
}

const beginFuture = () => {
  const blindingFlashUnTick1 = gsapTick( wormHoleFlashTick1 )
  setTimeout( () => {
    blindingFlashUnTick1()
    const blindingFlashUnTick2 = gsapTick( wormHoleFlashTick2 )
    g.el.flux.style.opacity = 0
    toggleFermata( { exceptTLs: [ 'dL' ] } )
    startDeLorean()

    setTimeout( () => {
      blindingFlashUnTick2()
      g.qss.wormHoler( {
        opacity: 0,
      } )
    }, 700 )
  },
  2300 )
}

const movable = [ '#deLorean', '#sideViewMirrorRight div:nth-child(2)' ]

const moveModel = ( movement, axis, el, value ) => {
  const p = `${movement}${axis}`
  const m = movement === 'rotate' ? 'rotation' : 'translation'
  const d = `#${m}${axis}${el}`
  gsap.to( movable[el], {
    duration: 0.25,
    onComplete: function () {
      gsap.set( d, {
        text: value,
      } )
    },
    overwrite: 'auto',
    [p]: value,
  } )
}

const setModel = () => {
  setAddOn( '#rotateX0', 'change', e => { moveModel( 'rotate', 'X', 0, e.target.value ) } )
  setAddOn( '#rotateY0', 'change', e => { moveModel( 'rotate', 'Y', 0, e.target.value ) } )
  setAddOn( '#rotateZ0', 'change', e => { moveModel( 'rotate', 'Z', 0, e.target.value ) } )
  setAddOn( '#translateX0', 'change', e => { moveModel( 'translate', 'X', 0, e.target.value ) } )
  setAddOn( '#translateY0', 'change', e => { moveModel( 'translate', 'Y', 0, e.target.value ) } )
  setAddOn( '#translateZ0', 'change', e => { moveModel( 'translate', 'Z', 0, e.target.value ) } )
  setAddOn( '#rotateX1', 'change', e => { moveModel( 'rotate', 'X', 1, e.target.value ) } )
  setAddOn( '#rotateY1', 'change', e => { moveModel( 'rotate', 'Y', 1, e.target.value ) } )
  setAddOn( '#rotateZ1', 'change', e => { moveModel( 'rotate', 'Z', 1, e.target.value ) } )
  setAddOn( '#translateX1', 'change', e => { moveModel( 'translate', 'X', 1, e.target.value ) } )
  setAddOn( '#translateY1', 'change', e => { moveModel( 'translate', 'Y', 1, e.target.value ) } )
  setAddOn( '#translateZ1', 'change', e => { moveModel( 'translate', 'Z', 1, e.target.value ) } )
}

const toggleFlightMode = () => {
  if ( g.three ) g.three.flm = !g.three.flm
}

const toggleFlyAlongPath = () => {
  if ( g.three.on ) {
    g.three.mov = true
  }
}

const toggleWheelsDrop = () => {
  if ( g.three ) g.three.lve = !g.three.lve
}

export {
  beginFuture, prepDeLorean, setFuture, setModel, startDeLorean, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
}
