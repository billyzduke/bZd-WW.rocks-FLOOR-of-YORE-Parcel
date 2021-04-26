const g = {
  b: {
    d: 12, // global bauble diameter
  },
  bL: [],
  crtns: {},
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
  vid: {},
  w: {},
}
g.b.r = g.b.d / 2
g.cyOffPx = g.b.d * 1.5 // magic number

export default g
