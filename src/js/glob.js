const g = {
  b: {
    d: 12, // global bauble diameter
  },
  bL: [],
  crtns: {},
  lightningRodQuickSetters: {},
  lion: {
    eyes: {},
    tShirt: false,
  },
  m: {},
  scene: {
    action: '',
    forCleanUp: [],
    current: 0,
    skip: {
      dur: 0,
      target: 0,
    },
  },
  tL: {},
  vid: {},
  w: {},
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
