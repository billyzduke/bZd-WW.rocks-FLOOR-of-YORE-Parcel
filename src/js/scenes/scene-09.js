import { gsap, TimelineMax as TL } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import assGemGuyIdle from 'url:/src/img/tShirt/gem-guy-on.gif'
import g from '../glob'
import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
// eslint-disable-next-line import/no-cycle
import { revertTshirt, transformTshirt } from '../lion-t-shirt'
import { setLightningRods } from '../lightning-rods'

gsap.registerPlugin(MotionPathPlugin)

const scene09 = 'Wake Up GemGuy / Bauble Layer 02'

g.tL.b = new TL({ defaults: { overwrite: 'auto' } })

const setScene09 = (c, n) => {
  g.scene.forCleanUp[c].vajraClick = setAddOn('#crossMyHeart', 'click', () => setScene(n))
  setAddOn('#heartChakra', 'mouseenter', transformTshirt)
  setAddOn('#heartChakra', 'mouseleave', revertTshirt)
  setLightningRods()

  if (g.scene.skip.ff) g.tL.b.timeScale(1 / g.scene.skip.ff)
  else flashBulb(g.el.heartChakra)

  gsap.set('#gankyil, #triskelion', {
    cursor: 'no-drop',
  })
  g.el.gemGuy.src = assGemGuyIdle

  const bLL = g.bL[2].b.length
  g.tL.b.set('#gankyil', {
    attr: {
      class: 'wheelOfJoy gank',
    },
  })
    .to('#bL02 #bW02 div.b.bL02_L', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL02_L',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL02_L',
        end: i => ((Math.abs(bLL / 2 - i) / bLL) * 0.9) + 0.55,
      },
      onComplete: function () {
        console.log('suckme L')
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    })
    .to('#bL02 #bW02 div.b.bL02_R', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL02_R',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL02_R',
        end: i => {
          let n
          switch (i) {
            case 0:
            case 1:
              n = 0.525
              break
            case 2:
              n = 0.53
              break
            default:
              n = 0.535
          }
          return ((Math.abs(bLL / 2 - i) / bLL) * 0.9) + n
        },
      },
      onComplete: function () {
        console.log('suckme R')
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    }, '<0.15')
    .to('#heartChakra', {
      duration: 1.5,
      ease: 'back.in',
      rotateZ: 360,
      repeat: 1,
      scale: 1.24,
      yoyo: true,
    }, '<2.5')
    .to('#gemPulse', {
      duration: 1.5,
      ease: 'power3.out',
      scale: 1.5,
      opacity: 0.88,
      repeat: 1,
      yoyo: true,
    }, '<')
    .set('#gankyil', {
      attr: {
        class: 'wheelOfJoy',
      },
    }, '<3')

  if (g.scene.skip.ff) g.tL.b.call(setScene, [ n ], '>')

  return true
}

export { scene09, setScene09 }
