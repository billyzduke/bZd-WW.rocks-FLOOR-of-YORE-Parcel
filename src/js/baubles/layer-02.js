import { setBaublesInLayer } from '.'
import g from '../glob'

const setBaubleLayer02 = () => {
  // eslint-disable-next-line array-bracket-newline, array-element-newline
  g.bL[2] = setBaublesInLayer(2, 40, { d: { b: [ 0, 1, 38, 39 ], v: g.b.d * 1.25 } })
  g.bL[2].b.forEach((b, i) => {
    b.classList.add(`bL02_${i % 2 ? 'L' : 'R'}`)
  })
  // the following only needed for console logging
  g.bL[2].L = []
  g.bL[2].R = []
}

export { setBaubleLayer02 }
