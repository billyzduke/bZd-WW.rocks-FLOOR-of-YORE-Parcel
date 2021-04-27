import { gsap, TimelineMax as TL } from 'gsap'

import g from '../glob'
import { gsapTick, setAddOn, setClearActors } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { flashBulb } from '../flashbulb'
import { obscureGrandiose } from '../obscuro'
import { spinRing } from '../baubles/layer-01'

const scene06 = 'Spin Gankyil / Spiral Out / The Worm Turns'

const presetScene08 = () => {
  gsap.set('#gemPulse', {
    opacity: 0,
    scale: 0,
  })
  gsap.set('#gemGuy', {
    translateX: 15,
    translateY: 3,
    width: 78,
    height: 102,
    cursor: 'wait',
  })
  gsap.set('#raelStar', {
    rotateZ: 360,
    scale: 0,
    translateX: 6.5,
    cursor: 'wait',
  })
  gsap.set('#crossMyHeart', {
    rotateZ: -1080,
    scale: 0,
  })
  if (g.el.discoWall) {
    setTimeout(() => {
      g.el.discoWall.src = 'https://wrongwindows.rocks/disco-wall'
    }, 3000)
  }
}

g.tL.ribs = new TL({ defaults: { overwrite: false } })
g.tL.stars = new TL({ defaults: { overwrite: false } })

const shiftSegment = rib => {
  g.tL.ribs.to(`.wormRibs path:nth-of-type(${rib})`, {
    duration: 0.42,
    ease: 'power2.in',
    rotation: '-=0.75',
    transformOrigin: '50% 50%',
  }, '>')
  g.worm.ribs.which--
  if (!g.worm.ribs.which) g.worm.ribs.which = 12
}

const setScene06 = (c, n) => {
  g.scene.forCleanUp[c].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(n))
  g.scene.forCleanUp[c].spinRingTicker = gsapTick(spinRing)
  g.scene.forCleanUp[c].clearDirt = () => setClearActors('#dirtVidWrapper')
  g.scene.forCleanUp[c].presetFutureScene = () => presetScene08()
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose(8)

  if (!g.scene.skip.ff) {
    flashBulb(g.bL[1].ctrRing)
    g.vid.bronze.play()

    // DON'T FORGET TO CLEAR THIS FUCKER LATER
    g.worm.ribs.ntrvl = setInterval(() => {
      shiftSegment(g.worm.ribs.which)
    }, 400)
  }

  // gsap.set('#gankyil', {
  //   opacity: 1,
  //   rotateZ: 0,
  //   scale: 1,
  // })

  // FIX INITIAL RIB SPACING // very arbitrary stuff, but interim SVGs are MIA
  g.tL.ribs.set('.wormRibs path:first-of-type, .wormRibs path:nth-of-type(2)', {
    rotation: '-=0.64',
  })
    .set('.wormRibs path:nth-of-type(8)', {
      rotation: '+=0.16',
    })
    .set('.wormRibs path:nth-of-type(9)', {
      rotation: '+=0.36',
    })
    .set('.wormRibs path:nth-of-type(10)', {
      rotation: '+=0.54',
    })
    .set('.wormRibs path:nth-of-type(11)', {
      rotation: '+=0.7',
    })
    .set('.wormRibs path:nth-of-type(12)', {
      rotation: '+=0.88',
    })

  // PREP STARFIELDS FOR NEXT SCENE
  g.tL.stars.set('.wormRing .wormTube .innerSpace .starField', {
    rotation: 'random(0, 360)',
    transformOrigin: '4096px 4096px',
  })

  g.el.drWorm.classList.add('anim')

  g.tL.gankyil.to('#gankyil', {
    duration: 10,
    ease: 'none',
    repeat: -1,
    rotateZ: '+=360',
    overwrite: true,
  })

  if (g.scene.skip.ff) g.tL.stars.call(setScene, [ n ], '>')

  return true
}

export { scene06, setScene06 }
