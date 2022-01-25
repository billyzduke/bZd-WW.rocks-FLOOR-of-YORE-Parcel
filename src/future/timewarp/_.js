import { gsap, TimelineMax as TL } from 'gsap'

import g from '/src/shared/_'
import {
  cleanUp, gsapTick, mixItUp, randoNum, setAddOn, setClearActors, shuffleArray,
} from '/src/shared/utils'
import { toggleFlyAlongPath } from '/src/future/bttf-tunnel/delorean/_'
import * as threeRend from '/src/shared/three/rend'
import { devLog } from '../../shared/utils'

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

const startGradientor = ( { induceSeizure = false } = {} ) => {
  g.gradientor.bin = cleanUp( g.gradientor.bin )
  gsap.to( '#gradientor', {
    duration: 1,
    opacity: 1,
  } )
  g.gradientor.bin.push( gsapTick( induceSeizure ? gradientorSeizureTick : gradientorGradualTick ) )
}

const switchStopColor = () => {
  g.gradientor.color = g.gradientor.color === 'rgb(255,255,255)' ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
}

const gradientorGradualTick = () => {
  gradientorTick( { induceSeizure: false } )
}

const gradientorSeizureTick = () => {
  gradientorTick( { induceSeizure: true } )
}

const gradientorTick = ( { induceSeizure = false } = {} ) => {
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
  if ( !induceSeizure ) {
    switchStopColor()
    gradBG += `, ${g.gradientor.color} 100%`
  } else gradO = randoNum( 1, 100 ) / 100
  gradBG += ')'
  g.qss.gradientor( {
    background: gradBG,
    opacity: gradO > 0.5 ? gradO : 0,
  } )
}

const unMaskWarpTick = () => {
  if ( g.warp.scale < 1 ) {
    g.warp.scale *= 1.1
    g.qss.warp( { opacity: '+=0.1', transform: `scale(${g.warp.scale}) rotateZ(${360 - ( g.warp.scale * 360 )}deg)` } )
  } else {
    g.warp.bin = cleanUp( g.warp.bin )
    g.qss.warp( { maskImage: 'none', WebkitMaskImage: 'none', transform: 'scale(1) rotateZ(0)' } )
    startWarp()
    g.warp.bin.push( setAddOn( '#flux, #moireAuras', 'click', fadeWarp ) )
    gsap.set( '#lynchBox', {
      backgroundImage: 'none',
    } )
  }
}

const setWarp = () => {
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
  g.warp = {
    bin: [],
    fade: [ '#flux, #gradientor', ...shuffleArray( g.el.trippyGrid ) ],
    scale: 0.01,
  }
  g.qss.warp = gsap.quickSetter( '#moireAuras', 'css' )
}

const startWarp = () => {
  g.tL.warp = new TL( { defaults: { overwrite: 'auto' } } )
  g.tL.warp.fromTo( '.trippyGrid.red', {
    rotate: 0,
  }, {
    duration: 4,
    ease: 'power1.inOut',
    rotate: 360,
    repeat: -1,
  } )
    .fromTo( '.trippyGrid.red', {
      scale: 0.6,
      skewX: 0,
    }, {
      duration: 2,
      ease: 'power2.inOut',
      scale: 2,
      skewX: '50%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .fromTo( '.trippyGrid.blue', {
      rotate: 0,
    }, {
      duration: 7,
      ease: 'power1.inOut',
      rotate: -360,
      repeat: -1,
    }, '<' )
    .fromTo( '.trippyGrid.blue', {
      scale: 0.76,
      skewY: 0,
    }, {
      duration: 3.6,
      ease: 'power2.inOut',
      scale: 4,
      skewY: '25%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .fromTo( '.trippyGrid.green', {
      rotate: 0,
    }, {
      duration: 10,
      ease: 'power2.inOut',
      rotate: 360,
      repeat: -1,
    }, '<' )
    .fromTo( '.trippyGrid.green', {
      scale: 0.88,
      skewX: 0,
    }, {
      duration: 3,
      ease: 'power1.inOut',
      scale: 4.2,
      skewX: '25%',
      repeat: -1,
      yoyo: true,
    }, '<' )
    .fromTo( '.trippyGrid.indigo', {
      rotate: 0,
    }, {
      duration: 11,
      ease: 'power2.inOut',
      rotate: -360,
      repeat: -1,
    }, '<' )
    .fromTo( '.trippyGrid.indigo', {
      scale: 0.75,
      skewY: 0,
    }, {
      duration: 5,
      ease: 'power1.inOut',
      scale: 4.8,
      skewY: '50%',
      repeat: -1,
      yoyo: true,
    }, '<' )
}

const fadeWarp = () => {
  if ( !g.warp.fading ) {
    g.warp.fading = true
    gsap.set( '#moireAuras', {
      cursor: 'wait',
    } )
    const fadeNext = g.warp.fade.shift()
    let mixable
    if ( typeof fadeNext === 'string' ) {
      devLog( { warpFades: g.warp.fade } )
      g.gradientor.bin = cleanUp( g.gradientor.bin )
      mixable = [ ...g.warp.fade ]
    } else mixable = [ fadeNext, ...g.warp.fade ]
    const mixModesAllowed = mixable.length === 1
      ? [
        'multiply',
        'screen',
        'overlay',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
      ]
      : []
    mixable.forEach( ( warp, i ) => {
      const mbm = mixItUp( { mixModesAllowed } )
      devLog( { warp: i, mbm, mixModesAllowed } )
      warp.style.mixBlendMode = mbm
    } )
    gsap.to( fadeNext, {
      duration: 1.5,
      opacity: 0,
      onComplete: function () {
        g.warp.fading = false
        gsap.set( '#moireAuras', {
          cursor: 'copy',
          pointerEvents: 'auto',
        } )
        if ( !g.warp.fade.length ) {
          g.warp.bin = cleanUp( g.warp.bin )
          setClearActors( '#blindingFlash, #gradientor, #moireAuras, #staticNoise' )
          gsap.to( '#flux', {
            duration: 0.25,
            opacity: 0,
            onComplete: function () {
              setClearActors( '#flux' )
              g.bttf.bin.push( setAddOn( '#bttfTunnel', 'click', toggleFlyAlongPath ) )
              g.bttf.on = true
              // g.bttf.mkr.io = undefined
              threeRend.startRendering()
            },
          } )
        }
      },
    } )
  }
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
//   const o = randoNum( 1, 100 ) / 100
//   const c = randoNum( 0, 11 )
//   g.qss.wormHoler( {
//     opacity: o < 0.42 ? 0 : o,
//     backgroundColor: wormHoleHexes[c],
//   } )
//   g.qss.moireAuras( 1 - ( o / 2 ) )
// }

// const wormHoleFlashTick2 = () => {
//   const o = randoNum( 1, 100 ) / 100
//   const c = randoNum( 0, 11 )
//   g.qss.wormHoler( {
//     opacity: 1,
//     backgroundColor: wormHoleHexes[c],
//   } )
//   g.qss.moireAuras( o )
// }

export {
  fadeWarp, setGradientor, startGradientor, setWarp, startWarp, unMaskWarpTick,
}
