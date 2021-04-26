const g = {
  bDiam: 12, // global bauble diameter
  bL: [],
  crtns: {},
  m: {},
  scene: {
    action: '',
    cleanUp: [],
    current: 0,
    skip: {
      dur: 0,
      target: 0,
    },
  },
  vid: {},
  w: {},
}
g.bRadii = g.bDiam / 2
g.w.cyOffPx = g.bDiam * 1.5 // magic number

export default g
