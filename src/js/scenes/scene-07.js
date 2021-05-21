import { gsap } from 'gsap'

import g from '../glob'
import { gsapTick, setAddOn } from '../utils'
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { orbitRing } from '../baubles/layer-01'
import { setJungle } from '../jungle'

const scene07 = 'Explicitly Orbital / Cosmic Digestion'

const shiftStars = () => {
  g.tL.stars.to('.wormRing .wormTube .innerSpace .starField.starField_01', {
    duration: 1,
    ease: 'power3.inOut',
    rotation: '+=random(1, 6)',
    stagger: {
      each: 0.2,
    },
  }, '>')
    .to('.wormRing .wormTube .innerSpace .starField.starField_02', {
      duration: 1,
      ease: 'power3.inOut',
      rotation: '+=random(1, 6)',
      stagger: {
        each: 0.2,
      },
    }, '>')
    .to('.wormRing .wormTube .innerSpace .starField.starField_03', {
      duration: 1,
      ease: 'power3.inOut',
      rotation: '+=random(1, 6)',
      stagger: {
        each: 0.2,
      },
    }, '>')
    .to('.wormRing .wormTube .innerSpace .starField.starField_04', {
      duration: 1,
      ease: 'power3.inOut',
      rotation: '+=random(1, 6)',
      stagger: {
        each: 0.2,
      },
    }, '>')
}

const setScene07 = (c, n) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(n), 'pointer', false)
  g.scene.forCleanUp[c].orbitRingTicker = gsapTick(orbitRing)
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose(5)

  setJungle()

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)
    g.worm.stars.ntrvl = setInterval(shiftStars, 4000)

    gsap.to('#solarCorona', {
      duration: 30,
      ease: 'none',
      repeat: -1,
      rotateZ: '+=360',
      overwrite: 'auto',
    })
  }

  gsap.to('.wormRing .wormTube .innerSpace', {
    duration: g.scene.skip.ff || 3,
    ease: 'power1.in',
    opacity: 1,
    stagger: -1.25,
  })
  g.tL.gankyil.to('#gankyil', {
    duration: 5,
    ease: 'none',
    repeat: -1,
    rotateZ: '+=360',
    overwrite: 'auto',
  })
  gsap.to('#solarCorona', {
    duration: g.scene.skip.ff || 2.5,
    opacity: 1,
    scale: 1,
  })
  gsap.to(g.el.wormSignScreen, {
    duration: g.scene.skip.ff || 9,
    ease: 'power1.in',
    onComplete() {
      if (g.el.wormSignScreen) {
        // THIS IS TO CORRECT SOME RANDOM BUGGINESS WITH THE mix-blend-mode: overlay ON wormSignScreen
        const wrmScr = g.el.wormSignScreen.cloneNode(true)
        const main = g.el.wormSignScreen.parentNode
        main.removeChild(g.el.wormSignScreen)
        g.el.wormSignScreen = wrmScr
        main.appendChild(g.el.wormSignScreen)
      }
    },
    scale: 1,
  })
  gsap.to(g.bL[1].bW, {
    duration: g.scene.skip.ff || 2,
    ease: 'power2.inOut',
    rotateZ: -30,
  })

  if (g.scene.skip.ff) setTimeout(() => setScene(n), 100)

  return true
}

export { scene07, setScene07 }
