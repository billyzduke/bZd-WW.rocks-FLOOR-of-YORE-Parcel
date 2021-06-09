import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import g from './glob'
import { setFlux } from './flux'
import {
  cleanUp, devLog, gsapTick, randOnum, setAddOn, setClearActors, toggleFermata,
} from './utils'

gsap.registerPlugin( TextPlugin )

const setGlitches = () => {
  gsap.set( '.colorBars', {
    width: ( 42 / 112 ) * g.main.h,
  } )
}

const setFuture = () => {
  g.tL.bttf = new TL( { defaults: { overwrite: 'auto' } } )
  // g.qss.wormHoler = gsap.quickSetter( '#blindingFlash', 'css' )
  setFlux()
  setGradientor()
  setWarps()
  gsap.set( '#future', { opacity: 1 } )
}

const setWarps = () => {
  let gridSize = g.main.w > g.main.h ? g.main.w : g.main.h
  gridSize *= 2
  gsap.set( '.trippyGrid', {
    width: gridSize,
    height: gridSize,
    // scale: 1.25,
    top: '50%',
    left: '50%',
    translateX: '-50%',
    translateY: '-50%',
  } )
  g.warps = {
    bin: [],
    scale: 0.01,
  }
  g.qss.warps = gsap.quickSetter( '#moireAuras', 'css' )
}

const startWarps = () => {
  g.tL.warp = new TL( { defaults: { overwrite: 'auto' } } )
  g.tL.warp.fromTo( '.trippyGrid.red', {
    rotate: 0,
  }, {
    duration: 4,
    ease: 'power1.out',
    rotate: 360,
    repeat: -1,
  } )
    .fromTo( '.trippyGrid.red', {
      scale: 1,
      skewX: 0,
    }, {
      duration: 2,
      scale: 2,
      skewX: '50%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .fromTo( '.trippyGrid.blue', {
      rotate: 0,
    }, {
      duration: 7,
      ease: 'power1.out',
      rotate: -360,
      repeat: -1,
    }, '<' )
    .fromTo( '.trippyGrid.blue', {
      scale: 1,
      skewY: 0,
    }, {
      duration: 4,
      scale: 4,
      skewY: '25%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .fromTo( '.trippyGrid.green', {
      rotate: 0,
    }, {
      duration: 10,
      rotate: 360,
      repeat: -1,
    }, '<' )
    .fromTo( '.trippyGrid.green', {
      scale: 1,
      skewX: 0,
    }, {
      duration: 3,
      ease: 'power1.out',
      scale: 6,
      skewX: '25%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .fromTo( '.trippyGrid.indigo', {
      rotate: 0,
    }, {
      duration: 11,
      rotate: -360,
      repeat: -1,
    }, '<' )
    .fromTo( '.trippyGrid.indigo', {
      scale: 1,
      skewY: 0,
    }, {
      duration: 5,
      ease: 'power1.out',
      scale: 8,
      skewY: '50%',
      repeat: -1,
      yoyo: true,
    }, '<' )
}

// const wormHoleHexes = [
//   'f8f8f8',
//   'fff7f7',
//   'f7efef',
//   'efe7f5',
//   'eadaee',
//   'e8ccee',
//   'd7bbed',
//   'eef7fb',
//   'a5adf7',
//   'd8bcf8',
//   '877bae',
//   'ffffff',
// ]

// const wormHoleFlashTick1 = () => {
//   const o = randOnum( 1, 100 ) / 100
//   const c = randOnum( 0, 11 )
//   g.qss.wormHoler( {
//     opacity: o < 0.42 ? 0 : o,
//     backgroundColor: wormHoleHexes[c],
//   } )
//   g.qss.moireAuras( 1 - ( o / 2 ) )
// }

// const wormHoleFlashTick2 = () => {
//   const o = randOnum( 1, 100 ) / 100
//   const c = randOnum( 0, 11 )
//   g.qss.wormHoler( {
//     opacity: 1,
//     backgroundColor: wormHoleHexes[c],
//   } )
//   g.qss.moireAuras( o )
// }

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
  } else {
    console.log( { alreadyOn: g.three.on } )
  }
}

const setGradientor = () => {
  g.qss.gradientor = gsap.quickSetter( '#gradientor', 'css' )
  g.gradientor = {
    bin: [],
    color: 'rgb(255,255,255)',
    stops: [
      0,
      20,
      40,
      60,
      80,
    ],
  }
}

const startGradientor = ( seizureInducing = false ) => {
  g.gradientor.bin = cleanUp( g.gradientor.bin )
  gsap.to( '#gradientor', {
    duration: 1,
    opacity: 1,
  } )
  g.gradientor.bin.push( gsapTick( seizureInducing ? gradientorSeizureTick : gradientorGradualTick ) )
}

const switchStopColor = () => {
  g.gradientor.color = g.gradientor.color === 'rgb(255,255,255)' ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
}

const gradientorGradualTick = () => {
  gradientorTick( false )
}

const gradientorSeizureTick = () => {
  gradientorTick( true )
}

const gradientorTick = ( seizureInducing = false ) => {
  let gradBG = `radial-gradient(circle, ${g.gradientor.color} 0%`
  let gradO = 1
  g.gradientor.stops.forEach( ( perc, stop ) => {
    switchStopColor()
    gradBG += `, ${g.gradientor.color} ${perc}%`
    g.gradientor.stops[stop] += 0.25
    if ( g.gradientor.stops[stop] === 100 ) {
      g.gradientor.stops = [
        0,
        20,
        40,
        60,
        80,
      ]
      switchStopColor()
    }
  } )
  if ( !seizureInducing ) {
    switchStopColor()
    gradBG += `, ${g.gradientor.color} 100%`
  } else gradO = randOnum( 1, 100 ) / 100
  gradBG += ')'
  g.qss.gradientor( {
    background: gradBG,
    opacity: gradO > 0.5 ? gradO : 0,
  } )
}

const unMaskWarpTick = () => {
  if ( g.warps.scale < 1 ) {
    g.warps.scale *= 1.1
    g.qss.warps( { opacity: '+=0.1', transform: `scale(${g.warps.scale}) rotateZ(${360 - ( g.warps.scale * 360 )}deg)` } )
  } else {
    g.warps.bin = cleanUp( g.warps.bin )
    g.qss.warps( { maskImage: 'none', WebkitMaskImage: 'none', transform: 'scale(1) rotateZ(0)' } )
    startWarps()
    g.warps.bin.push( setAddOn( '#flux, #moireAuras', 'click', fadeMoireAuras ) )
  }
}

const beginFuture = () => {
  // const blindingFlashUnTick1 = gsapTick( wormHoleFlashTick1 )
  startGradientor( true )
  setTimeout( () => {
    // blindingFlashUnTick1()
    // const blindingFlashUnTick2 = gsapTick( wormHoleFlashTick2 )
    toggleFermata( { exceptTLs: [ 'dL', 'warp' ] } )
    startDeLorean()
    startGradientor()
    setTimeout( () => {
      // blindingFlashUnTick2()
      // wormHoleFlashTick2()
      const warpsMaskSize = g.main.h < g.main.w ? g.main.h : g.main.w
      g.qss.warps( { maskSize: `${warpsMaskSize}px ${warpsMaskSize}px` } )
      g.warps.bin.push( gsapTick( unMaskWarpTick ) )
    }, 777 )
  }, 2342 )
}

const fadeMoireAuras = () => {
  g.warps.bin = cleanUp( g.warps.bin )
  g.gradientor.bin = cleanUp( g.gradientor.bin )
  gsap.to( '#gradientor', {
    duration: 0.75,
    opacity: 0,
    onComplete: function () {
      setClearActors( '#blindingFlash, #gradientor, #staticNoise' )
      gsap.to( '.trippyGrid', {
        duration: 3.6,
        opacity: 0,
        onComplete: function () {
          setClearActors( '#moireAuras' )
          gsap.to( '#flux', {
            duration: 0.75,
            opacity: 0,
            onComplete: function () {
              setClearActors( '#flux' )
              g.three.bin.push( setAddOn( '#deLorean', 'click', toggleFlyAlongPath ) )
              g.three.on = true
              // g.three.mkr.io = undefined
              g.three.mkr.startRendering()
            },
          } )
        },
        stagger: 0.75,
      } )
    },
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
  beginFuture, prepDeLorean, setFuture, setGlitches, setModel, setWarps, startDeLorean, startGradientor, startWarps, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
}
