import { gsap } from 'gsap'

import { setBaublesInLayer } from '.'
import g from '/src/js/glob'
import { padStr } from '/src/js/utils'

const setBaubleLayer03 = () => {
  const bL = 3
  // eslint-disable-next-line array-bracket-newline, array-element-newline
  g.bL[bL] = setBaublesInLayer( bL, 28, { d: { b: [ 0, 1 ], v: g.b.d * 1.25 } } )
  if ( g.bL[bL] ) {
    g.bL[bL].b.forEach( ( b, i ) => {
      b.classList.add( `bL${padStr( bL )}_${i % 2 ? 'L' : 'R'}` )
    } )
  }
  // if (g.el.body.classList.contains('dev')) {
  //   g.bL[bL].L = []
  //   g.bL[bL].R = []
  // }
}

const animateBaubleLayer03 = ( side, ff ) => {
  const bLL = g.bL[3].b.length
  gsap.to( `#bL03 #bW03 div.b.bL03_${side}`, {
    duration: ff || 2.5,
    ease: 'none',
    motionPath: {
      align: `#bL03_${side}`,
      alignOrigin: [ 0.5, 0.5 ],
      path: `#bL02_${side}`,
      start: 0.1,
      end: i => {
        let n
        switch ( i ) {
          case 0:
            n = side === 'L' ? 0.74 : 0.7375
            break
          default:
            n = side === 'L' ? 0.74 : 0.72
        }
        return ( Math.abs( bLL / 2 - i ) / ( bLL * 2 ) ) + n
      },
    },
    onComplete: function () {
      g.bL[3].x[side] = true
    },
    opacity: 1,
    scale: 0.9,
    stagger: {
      each: ff || 0.15,
    },
  } )
}

export { animateBaubleLayer03, setBaubleLayer03 }
