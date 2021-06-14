import { setBaublesInLayer } from '/src/main-stage/baubles/_'
import g from '/src/shared/_'
import { padStr } from '/src/shared/utils'
import { animateBaubleLayer03 } from '/src/main-stage/baubles/layer-03/_'

const setBaubleLayer04 = () => {
  const bL = 4
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

const animateBaubleLayer04 = ff => {
  const bLL = g.bL[4].b.length
  g.tL.b.timeScale( ff ? 1 / ff : 1 )
  g.tL.b
    .to( '#bL04 #bW04 div.b.bL04_L', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL04_L',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL04_L',
        end: i => ( ( Math.abs( bLL / 2 - i ) / ( bLL * 2 ) ) * 0.8 ) + 0.79,
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    } )
    .to( '#bL04 #bW04 div.b.bL04_R', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL04_R',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL04_R',
        end: i => {
          let n
          switch ( i ) {
            case 0:
              n = 0.777
              break
            default:
              n = 0.77
          }
          return ( ( Math.abs( bLL / 2 - i ) / ( bLL * 2 ) ) * 0.8 ) + n
        },
      },
      onComplete: function () {
        g.tL.b.timeScale( 1 )
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    }, '<0.15' )
}

const animateBaubleLayer03or04 = ( side, ff ) => {
  let bSide = side
  if ( !bSide ) bSide = 'L'
  if ( g.bL[3].x[bSide] ) bSide = bSide === 'L' ? 'R' : 'L'
  if ( g.bL[3].x[bSide] ) animateBaubleLayer04( ff )
  else animateBaubleLayer03( bSide, ff )
}

export { animateBaubleLayer03or04, setBaubleLayer04 }
