import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import g from './glob'
import { setFlux } from './flux'
import {
  ifFunctionThenCall, gsapTick, randOnum, setAddOn, setClearActors, toggleFermata,
} from './utils'

gsap.registerPlugin( TextPlugin )

const setGlitches = () => {
  gsap.set( '.colorBars', {
    width: ( 42 / 112 ) * g.main.h,
  } )
}

const setFuture = () => {
  g.tL.bttf = new TL( { defaults: { overwrite: 'auto' } } )
  g.qss.wormHoler = gsap.quickSetter( '#blindingFlash', 'css' )
  setFlux()
  setWarps()
  gsap.set( '#future', { opacity: 1 } )
}

const setWarps = () => {
  let gridSize = g.main.w > g.main.h ? g.main.w : g.main.h
  gridSize *= 2
  gsap.set( '.trippyGrid', {
    width: gridSize,
    height: gridSize,
    scale: 1.25,
    top: '50%',
    left: '50%',
    translateX: '-50%',
    translateY: '-50%',
  } )
}

const startWarps = () => {
  g.tL.warp = new TL( { defaults: { overwrite: 'auto' } } )
  g.tL.warp.to( '.trippyGrid.red', {
    duration: 4,
    rotate: 360,
    repeat: -1,
  } )
    .to( '.trippyGrid.red', {
      duration: 2,
      scale: 3,
      skewX: '50%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .to( '.trippyGrid.blue', {
      duration: 8,
      rotate: -360,
      repeat: -1,
    }, '<' )
    .to( '.trippyGrid.blue', {
      duration: 4,
      scale: 5,
      skewY: '25%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .to( '.trippyGrid.green', {
      duration: 10,
      rotate: 360,
      repeat: -1,
    }, '<' )
    .to( '.trippyGrid.green', {
      duration: 2,
      scale: 6,
      skewX: '25%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .to( '.trippyGrid.indigo', {
      duration: 12,
      rotate: -360,
      repeat: -1,
    }, '<' )
    .to( '.trippyGrid.indigo', {
      duration: 6,
      scale: 12,
      skewY: '50%',
      repeat: -1,
      yoyo: true,
    }, '<' )
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
    g.three.mkr.prepped = true
    gsap.set( '#glitches', { opacity: 1 } )
    g.three.on = true
    g.el.deLorean.style.left = 0
    setTimeout( () => {
      g.three.mkr.startRendering()
    }, 100 )
  }
}

const startDeLorean = () => {
  if ( !g.three.on ) {
    g.el.deLorean.style.opacity = 1
    g.el.deLorean.style.pointerEvents = 'auto'
    g.three.on = true
    // g.three.mkr.io = undefined
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
      gsap.set( '#moireAuras', {
        opacity: 1,
        backgroundColor: 'rgba(255,255,255,1)',
      } )
      g.three.cleanUp.moireAuras = setAddOn( '#moireAuras', 'click', fadeMoireAuras )
    }, 700 )
  }, 2300 )
}

const fadeMoireAuras = () => {
  ifFunctionThenCall( g.three.cleanUp.moireAuras )
  g.three.cleanUp.moireAuras = undefined
  gsap.to( '#moireAuras', {
    duration: 6,
    opacity: 0,
    onComplete: function () {
      setClearActors( '#moireAuras, #blindingFlash, #flux' )
      g.three.cleanUp.backItUp = setAddOn( '#deLorean', 'click', toggleFlyAlongPath )
    },
  } )
  gsap.to( '#moireAuras', {
    duration: 3,
    backgroundColor: 'rgba(255,255,255,0)',
  } )
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
  beginFuture, prepDeLorean, setFuture, setGlitches, setModel, startDeLorean, startWarps, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
}
