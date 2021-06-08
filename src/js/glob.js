const g = {
  // these first three keys need to be set here, rather than in the components' respective set functions
  // I guess because they happen in the first scene, and the global g isn't yet established at that point?
  b: {
    d: 12, // global bauble diameter
  },
  bL: [], // bauble layers
  fermata: false, // Is "time" frozen or not
  lion: {
    eyes: {},
    forCleanUp: {},
    tShirt: false,
  },
  m: {}, // mouse position
  main: {}, // scaled dimensions reference for main container(s)
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
  qss: {}, // gsap quickSetters
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
  subScene: {},
  tickers: {}, // gsap tickers
  tL: {}, // gsap timelines
  vid: {}, // video.js objects
  w: {}, // window size properties
}
g.b.r = g.b.d / 2
g.cyOffPx = g.b.d * 1.5 // magic number

export default g
