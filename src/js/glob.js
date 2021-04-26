const g = {
  bDiam: 12, // global bauble diameter
  bL: [],
  crtns: {},
  m: { x: 0, y: 0 },
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
}
g.bRadii = g.bDiam / 2
g.cyOffPx = g.bDiam * 1.5 // magic number

export default g
