import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import g from './glob'
import { setFlux } from './flux'
import { setThree } from './three'
import {
  gsapTick, randOnum, setAddOn, toggleFermata,
} from './utils'

gsap.registerPlugin( TextPlugin )

const setFuture = () => {
  g.tL.bttf = new TL( { defaults: { overwrite: 'auto' } } )
  g.qss.wormHoler = gsap.quickSetter( '#blindingFlash', 'css' )
  setFlux()
  gsap.set( '#future', { opacity: 1 } )
  setThree()
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

const startDeLorean = () => {
  if ( !g.three.on ) {
    g.el.deLorean.style.opacity = 1
    g.three.ani.go()
    g.three.on = true
  }
}

const beginFuture = () => {
  const blindingFlashUnTick1 = gsapTick( wormHoleFlashTick1 )

  setTimeout( () => {
    blindingFlashUnTick1()
    const blindingFlashUnTick2 = gsapTick( wormHoleFlashTick2 )
    g.el.flux.style.opacity = 0
    toggleFermata( { exceptTLs: [ 'bttf' ] } )
    startDeLorean()

    setTimeout( () => {
      blindingFlashUnTick2()
      g.qss.wormHoler( {
        opacity: 0,
      } )
      flyOver()
    }, 700 )
  },
  2300 )
}

const flyOver = () => {
  // gsap.to( '.lightBar > div', {
  //   duration: 1.5,
  //   ease: 'power1.in',
  //   opacity: 0.12,
  //   repeat: -1,
  //   yoyo: true,
  // } )


  //   .to( '#deLoreanCSS', {
  //     duration: 9,
  //     ease: 'power2.in',
  //     translateZ: -500,
  //   } )
  //   .to( '#deLoreanCSS', {
  //     duration: 7.5,
  //     ease: 'power2.in',
  //     rotateY: '-=90',
  //   }, '<5' )
  //   .to( '#deLoreanCSS', {
  //     duration: 3.5,
  //     ease: 'power2.in',
  //     rotateZ: '+=30',
  //     repeat: 1,
  //     yoyo: true,
  //   }, '<2' )
  //   .to( '#deLoreanCSS', {
  //     duration: 5,
  //     ease: 'power2.in',
  //     translateX: '-=50',
  //     translateY: '-=200',
  //   }, '<' )
  //   .to( '#deLoreanCSS', {
  //     duration: 3.5,
  //     ease: 'power2.in',
  //     rotateX: '-=15',
  //     repeat: 1,
  //     yoyo: true,
  //   }, '>' )
  //   .to( '#deLoreanCSS', {
  //     duration: 4,
  //     ease: 'power2.out',
  //     translateX: '+=150',
  //     translateY: '-=100',
  //     translateZ: -400,
  //   }, '<' )
  // // CONVERT FROM FLYING TO DRIVING MODE
  // // TURN OFF WHEEL ROCKETS
  //   .to( '#deLoreanCSS #wheels .wheel .rocket', {
  //     duration: 1.25,
  //     scaleY: 0,
  //   }, '>' )
  // // SET WHEELS IN WELLS
  //   .to( '#wheelsLeft', {
  //     duration: 4,
  //     rotateY: 90,
  //     translateZ: '-=42',
  //   }, '>' )
  //   .to( '#wheelsRight', {
  //     duration: 4,
  //     rotateY: -90,
  //     translateZ: '-=42',
  //   }, '<' )
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
  if ( g.three ) g.three.mov = !g.three.mov
}

const toggleWheelsDrop = () => {
  if ( g.three ) g.three.lve = !g.three.lve
}

export {
  beginFuture, setFuture, setModel, startDeLorean, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
}
