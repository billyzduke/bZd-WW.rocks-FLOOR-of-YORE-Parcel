import { setBaublesInLayer } from '/src/main-stage/baubles/_'
import g from '/src/shared/_'
import { padStr } from '/src/shared/utils'

const setBaubleLayer02 = () => {
  const bL = 2
  // eslint-disable-next-line array-bracket-newline, array-element-newline
  g.bL[bL] = setBaublesInLayer( bL, 40, { d: { b: [ 0, 1, 38, 39 ], v: g.b.d * 1.25 } } )
  g.bL[bL].b.forEach( ( b, i ) => {
    b.classList.add( `bL${padStr( bL )}_${i % 2 ? 'L' : 'R'}` )
  } )
  // if (g.el.body.classList.contains('dev')) {
  //   g.bL[bL].L = []
  //   g.bL[bL].R = []
  // }
}

export { setBaubleLayer02 }
