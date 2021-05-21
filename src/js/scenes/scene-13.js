import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { toggleFermata } from '../utils'

const scene13 = 'Enter the DeLorean'

const setScene13 = (c, n) => {
  g.scene.setting = c

  g.tL.bttf = new TL({ defaults: { overwrite: 'auto' } })


  spinTime()

  return true
}

const spinTime = () => {
  // gsap.set('#deLorean', {
  //   rotateX: 90,
  //   rotateY: 180,
  //   rotateZ: 180,
  //   translateZ: 1000,
  //   translateY: 200,
  // })

  // gsap.to('#deLorean', {
  //   duration: 20,
  //   ease: 'none',
  //   repeat: -1,
  //   rotateX: 0,
  //   yoyo: true,
  // })
  // gsap.to('#deLorean', {
  //   duration: 40,
  //   ease: 'none',
  //   repeat: -1,
  //   rotateY: 270,
  //   yoyo: true,
  // })

  gsap.to('.lightBar > div', {
    duration: 1.5,
    ease: 'power1.in',
    opacity: 0.12,
    repeat: -1,
    yoyo: true,
  })

  g.tL.bttf.to('#deLorean', {
    duration: 3,
    ease: 'power2.in',
    onComplete: function () {
      toggleFermata(true, { exceptTLs: [ 'bttf' ] })
    },
    opacity: 1,
  })
    .to('#deLorean', {
      duration: 9,
      ease: 'power2.in',
      translateZ: -500,
    })
    .to('#deLorean', {
      duration: 7.5,
      ease: 'power2.in',
      rotateY: '-=90',
    }, '<5')
    .to('#deLorean', {
      duration: 3.5,
      ease: 'power2.in',
      rotateZ: '+=30',
      repeat: 1,
      yoyo: true,
    }, '<2')
    .to('#deLorean', {
      duration: 5,
      ease: 'power2.in',
      translateX: '-=50',
      translateY: '-=200',
    }, '<')
    .to('#deLorean', {
      duration: 3.5,
      ease: 'power2.in',
      rotateX: '-=15',
      repeat: 1,
      yoyo: true,
    }, '>')
    .to('#deLorean', {
      duration: 4,
      ease: 'power2.out',
      translateX: '+=150',
      translateY: '-=100',
      translateZ: -400,
    }, '<')


  // // CONVERT FROM FLYING TO DRIVING MODE
  // gsap.to('#wheelsLeft', {
  //   duration: 4,
  //   rotateY: 90,
  //   translateZ: '-=42',
  //   // repeat: -1,
  //   // yoyo: true,
  // })
  // gsap.to('#wheelsRight', {
  //   duration: 4,
  //   rotateY: -90,
  //   translateZ: '-=42',
  //   // repeat: -1,
  //   // yoyo: true,
  // })

  // gsap.to('#deLorean', {
  //   duration: 30,
  //   ease: 'none',
  //   repeat: -1,
  //   rotateZ: 360,
  //   yoyo: true,
  // })
}

export { scene13, setScene13 }
