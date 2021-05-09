import { setBaublesInLayer } from '.'
import g from '../glob'

const setBaubleLayer03 = () => {
  // eslint-disable-next-line array-bracket-newline, array-element-newline
  g.bL[3] = setBaublesInLayer(3, 28, { d: { b: [ 0, 1 ], v: g.b.d * 1.25 } })
  if (g.bL[3]) {
    g.bL[3].b.forEach((b, i) => {
      b.classList.add(`b03_${i % 2 ? 'L' : 'R'}`)
    })
  }
  // if (g.el.body.classList.contains('dev')) {
  //   g.bL[3].L = []
  //   g.bL[3].R = []
  // }
}

export { setBaubleLayer03 }
