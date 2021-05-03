const g = {
  b: {
    d: 12, // global bauble diameter
  },
  bL: [], // bauble layers
  crtns: {},
  exc: {
    dir: false,
    max: 42,
    which: 0,
  },
  foetus: {},
  folklore: {
    binary: {},
    lore: [],
    progress: '',
  },
  lion: {
    eyes: {},
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
    foetusEyes: {},
    lightningRods: {},
    ramIconHorns: [],
  },
  ramIcon: {},
  scene: { // global scene manager
    action: '',
    forCleanUp: [],
    current: 0,
    skip: {
      dur: 0,
      target: 0,
    },
  },
  subSceneActive: false,
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

export default g
