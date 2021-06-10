import { gsap, TimelineMax as TL } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

import g from '../glob'
// import { setBaubleLayer01 } from '../baubles/layer-01'
import { obscure } from '../obscuro'
import { setBaubleLayers } from '../baubles'
import { drawYore } from '../titles'
import { animateLynchBox, setLynchBox } from '../lynch-box'

gsap.registerPlugin( DrawSVGPlugin )

const scene00 = 'Fade In / DAYS OF YORE'

g.tL.yore = new TL( { defaults: { overwrite: 'auto' } } ) // general use global timeline

const setScene00 = ( c, n ) => {
  g.scene.setting = c
  // Only functions that return a boolean can be included in forCleanUp
  g.scene.forCleanUp[c].obscureNextScene = () => obscure( 3 )

  // setBaubleLayer01()
  setBaubleLayers()
  if ( g.tL.yore ) drawYore( c, n )

  setLynchBox()
  // animateLynchBox( 10, 500 )

  return true
}

// const spinTime = () => {
//   g.el.rotateX0.value = 34
//   g.el.rotateY0.value = -142
//   g.el.rotateZ0.value = -139
//   gsap.set( '#deLorean', {
//     rotateX: g.el.rotateX0.value,
//     rotateY: g.el.rotateY0.value,
//     rotateZ: g.el.rotateZ0.value,
//   } )
//   // gsap.fromTo('#deLorean', {
//   //   rotateX: 20,
//   //   rotateY: 20,
//   //   rotateZ: 20,
//   // }, {
//   //   ease: 'none',
//   //   duration: 2,
//   //   rotateX: -20,
//   //   rotateY: -20,
//   //   rotateZ: -20,
//   //   repeat: -1,
//   //   yoyo: true,
//   // })
//   // gsap.to('#deLorean', {
//   //   duration: 20,
//   //   ease: 'none',
//   //   repeat: -1,
//   //   rotateZ: 120,
//   //   yoyo: true,
//   // })
//   // gsap.to('#deLorean', {
//   //   duration: 40,
//   //   ease: 'none',
//   //   repeat: -1,
//   //   rotateY: 120,
//   //   yoyo: true,
//   // })
//   gsap.to( '.lightBar > div', {
//     duration: 1.5,
//     ease: 'power1.in',
//     opacity: 0.12,
//     repeat: -1,
//     yoyo: true,
//   } )
//   // gsap.to('#deLorean', {
//   //   duration: 30,
//   //   ease: 'none',
//   //   repeat: -1,
//   //   rotateX: 90,
//   //   yoyo: true,
//   // })
//   // gsap.to('#deLorean #wheels .wheel .rocket', {
//   //   delay: 5,
//   //   duration: 1.25,
//   //   scaleY: 0,
//   // })
// }

export { scene00, setScene00 }
