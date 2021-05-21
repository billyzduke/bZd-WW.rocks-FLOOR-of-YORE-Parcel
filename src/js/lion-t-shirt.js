import { gsap, TimelineMax as TL } from 'gsap'

import assGemGuyOff from 'url:/src/img/tShirt/gem-guy-off.gif'
import assGemGuyIdle from 'url:/src/img/tShirt/gem-guy-on.gif'
import assGemGuyOver from 'url:/src/img/tShirt/gem-guy-over.gif'
import g from './glob'
import { setScene } from './scene'

const toggleGemGuy = () => {
  g.el.gemGuy.src = g.el.gemGuy.src === assGemGuyIdle ? assGemGuyOff : assGemGuyIdle
}

const setShirtState = nuTsS => {
  g.lion.tShirt = nuTsS
}

const revertTshirt = () => {
  if (typeof g.lion.tShirt === 'boolean' && g.lion.tShirt && g.el.theLion.classList.contains('anim')) {
    g.lion.tShirt = undefined
    g.tL.tShirtOff = gsap.timeline({ defaults: { overwrite: true } })
    gsap.set('#gemGuy', {
      attr: {
        src: assGemGuyIdle,
      },
      width: 78,
      height: 102,
      translateX: 15,
      translateY: 5,
    })
    if (g.scene.current === 10) setScene(11)
    g.tL.tShirtOff.to('#gemPulse', {
      duration: 1,
      ease: 'power2.out',
      scale: 1.5,
      opacity: 0.88,
      repeat: 1,
      yoyo: true,
    }, 0)
      .to('#crossMyHeart', {
        duration: 0.5,
        ease: 'power3.in',
        rotateZ: -1080,
        scale: 0,
      }, 0)
      .to('#heartPulse', {
        duration: 1,
        opacity: 0,
      }, 0)
      .to('#gemGuy', {
        duration: 1,
        ease: 'back.in',
        rotateZ: 0,
        scale: 1,
      }, 0)
      .set('#raelStar', {
        rotateZ: 360,
        scale: 0,
      }, 0)
      .to('#gemPulse', {
        duration: 0.5,
        opacity: 0,
        overwrite: 'auto',
        scale: 0,
      }, 2)
      .call(setShirtState, [ false ], 1)
  }
}

const transformTshirt = () => {
  if (typeof g.lion.tShirt === 'boolean' && !g.lion.tShirt && g.el.theLion.classList.contains('anim')) {
    g.lion.tShirt = undefined
    g.tL.tShirtOn = new TL({ defaults: { overwrite: true } })
    gsap.set('#gemGuy', {
      attr: {
        src: assGemGuyOver,
      },
      width: 108,
      height: 108,
      translateX: 0,
      translateY: 0,
    })
    g.tL.tShirtOn.to('#gemPulse', {
      duration: 1,
      ease: 'power2.out',
      scale: 1.5,
      opacity: 0.88,
      repeat: 1,
      yoyo: true,
    }, 0)
      .to('#raelStar', {
        duration: 2,
        ease: 'none',
        rotateZ: -360,
      }, 0)
      .to('#gemGuy', {
        duration: 1,
        ease: 'back.in',
        rotateZ: 1080,
        scale: 0,
      }, 0)
      .to('#raelStar', {
        duration: 0.375,
        ease: 'power2.out',
        scale: 1,
        opacity: 1,
        overwrite: 'auto',
      }, '<0.75')
      .to('#raelStar', {
        duration: 0.375,
        ease: 'power2.in',
        scale: 0,
        opacity: 0,
        overwrite: 'auto',
      }, '>')
      .to('#heartPulse', {
        duration: 1,
        opacity: 1,
      }, 1)
      .to('#crossMyHeart', {
        duration: 0.5,
        ease: 'power3.in',
        rotation: 0,
        scale: 1,
      }, 1.25)
      .to('#gemPulse', {
        duration: 0.5,
        opacity: 0,
        overwrite: 'auto',
        scale: 0,
      }, 2)
      .call(setShirtState, [ true ], 2)
    setTimeout(revertTshirt, 4242)
  }
}

export { revertTshirt, toggleGemGuy, transformTshirt }
