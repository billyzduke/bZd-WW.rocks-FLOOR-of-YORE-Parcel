import { setBaublesInLayer } from '.'
import g from '../glob'
import { padStr } from '../utils'
import { animateBaubleLayer03 } from './layer-03'

const setBaubleLayer04 = () => {
  const bL = 4
  // eslint-disable-next-line array-bracket-newline, array-element-newline
  g.bL[bL] = setBaublesInLayer(bL, 28, { d: { b: [ 0, 1 ], v: g.b.d * 1.25 } })
  if (g.bL[bL]) {
    g.bL[bL].b.forEach((b, i) => {
      b.classList.add(`bL${padStr(bL)}_${i % 2 ? 'L' : 'R'}`)
    })
  }
  // if (g.el.body.classList.contains('dev')) {
  //   g.bL[bL].L = []
  //   g.bL[bL].R = []
  // }
}

const animateBaubleLayer04 = () => {
  const bLL = g.bL[4].b.length
  g.tL.b
    .to('#bL04 #bW04 div.b.bL04_L', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL04_L',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL04_L',
        end: i => ((Math.abs(bLL / 2 - i) / bLL) * 0.9) + 0.55,
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    })
    .to('#bL04 #bW04 div.b.bL04_R', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL04_R',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL04_R',
        end: i => {
          let n
          switch (i) {
            case 0:
            case 1:
              n = 0.525
              break
            case 2:
              n = 0.53
              break
            default:
              n = 0.535
          }
          return ((Math.abs(bLL / 2 - i) / bLL) * 0.9) + n
        },
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    }, '<0.15')
}

const animateBaubleLayer03or04 = (side) => {
  let bSide = side
  if (g.bL[3].x[bSide]) bSide = bSide === 'L' ? 'R' : 'L'
  if (g.bL[3].x[bSide]) animateBaubleLayer04()
  else animateBaubleLayer03(bSide)
}

export { animateBaubleLayer03or04, setBaubleLayer04 }
