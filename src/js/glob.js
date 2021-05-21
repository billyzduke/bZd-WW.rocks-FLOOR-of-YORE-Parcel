import gsap from 'gsap/gsap-core'

import { ifFunctionThenCall } from './utils'

const g = {
  b: {
    d: 12, // global bauble diameter
  },
  bL: [], // bauble layers
  codeRain: {},
  crtns: {},
  exc: {
    dir: false,
    max: 42,
    which: 0,
  },
  foetus: {
    forCleanUp: [],
  },
  folklore: {
    binary: {},
    forCleanUp: {},
    lore: [],
  },
  jungle: [],
  lion: {
    eyes: {},
    forCleanUp: {},
    tShirt: false,
  },
  m: {}, // mouse position
  main: {}, // scaled dimensions reference for main container
  mixBlendModes: [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ],
  qss: { // gsap quickSetters
    bloodSplashes: {},
    foetus: {},
    lightningRods: {},
    smoke: {},
  },
  ramIcon: {
    forCleanUp: [],
  },
  scene: { // global scene manager
    action: '',
    forCleanUp: [],
    current: 0,
    setting: 0,
    skip: {
      ff: 0,
      target: 0,
    },
  },
  smoke: {},
  subScene: {},
  tL: {}, // gsap timelines
  vid: {}, // video.js objects
  w: {}, // window size properties
  worm: {
    ribs: {
      ntrvl: null,
      which: 12,
    },
    ring: {
      dO: 10692.6,
      dI: 8192,
    },
    stars: {
      ntrvl: null,
    },
  },
}
g.b.r = g.b.d / 2
g.cyOffPx = g.b.d * 1.5 // magic number
g.worm.ring.rO = g.worm.ring.dO / 2

const toggleTime = (pause = true, exceptTLs = []) => {
  if (pause) {
    if (g.scene.current >= 11) {
      gsap.set('.handEyeWrapper', {
        attr: {
          class: 'handEyeWrapper',
        },
      })
    }
    Object.keys(g.tL).forEach(tL => {
      if (g.tL[tL]) ifFunctionThenCall(g.tL[tL].pause)
    })
  } else {
    // eslint-disable-next-line no-lonely-if
    if (g.scene.current >= 11) {
      gsap.set('.handEyeWrapper', {
        attr: {
          class: 'handEyeWrapper',
        },
      })
    }
  }
}

export { g as default, toggleTime }
