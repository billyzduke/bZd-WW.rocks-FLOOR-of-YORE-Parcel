const g = {
  bDiam: 12, // global bauble diameter
  crtns: {},
  m: { x: 0, y: 0 },
  scene: {
    action: '',
    cleanUp: [],
    current: 0,
    skipDur: 0,
    skipTarget: 0,
  },
}
g.cyOffPx = g.bDiam * 1.5 // magic number

export { g }
