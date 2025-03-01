import { gsap, TimelineMax as TL } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import g from '/src/shared/_'
import { setAddOn } from '/src/shared/utils'
import { setScene } from '/src/scenes/_'
import { flashBulb } from '/src/main-stage/flashbulb/_'
import { revertTshirt, toggleGemGuy, transformTshirt } from '/src/main-stage/lion/lion-torso/lion-t-shirt/_'
import { setLightningRods } from '/src/shared/lightning-rods/_'

gsap.registerPlugin( MotionPathPlugin )

const scene09 = 'Wake Up GemGuy / Bauble Layer 02'

g.tL.b = new TL( { defaults: { overwrite: 'auto' } } )

const setScene09 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].vajraClick = setAddOn( '#crossMyHeart', 'click', () => setScene( n ) )
  setAddOn( '#heartChakra', 'mouseenter', transformTshirt )
  setAddOn( '#heartChakra', 'mouseleave', revertTshirt )
  setLightningRods()
  toggleGemGuy()

  if ( g.scene.skip.ff ) g.tL.b.timeScale( 1 / g.scene.skip.ff )
  else flashBulb( g.el.heartChakra )

  gsap.set( '#gankyil, #triskelion', {
    cursor: 'no-drop',
  } )

  const bLL = g.bL[2].b.length
  g.tL.b.set( '#gankyil', {
    attr: {
      class: 'wheelOfJoy gank',
    },
  } )
    .to( '#bL02 #bW02 div.b.bL02_L', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL02_L',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL02_L',
        end: i => ( ( Math.abs( bLL / 2 - i ) / bLL ) * 0.9 ) + 0.55,
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    } )
    .to( '#bL02 #bW02 div.b.bL02_R', {
      duration: 2.5,
      ease: 'none',
      motionPath: {
        align: '#bL02_R',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#bL02_R',
        end: i => {
          let n
          switch ( i ) {
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
          return ( ( Math.abs( bLL / 2 - i ) / bLL ) * 0.9 ) + n
        },
      },
      opacity: 1,
      scale: 0.9,
      stagger: {
        each: 0.15,
      },
    }, '<0.15' )
    .to( '#heartChakra', {
      duration: 1.5,
      ease: 'back.in',
      rotateZ: 360,
      repeat: 1,
      scale: 1.24,
      yoyo: true,
    }, '<2.5' )
    .to( '#gemPulse', {
      duration: 1.5,
      ease: 'power3.out',
      scale: 1.5,
      opacity: 0.88,
      repeat: 1,
      yoyo: true,
    }, '<' )
    .set( '#gankyil', {
      attr: {
        class: 'wheelOfJoy',
      },
    }, '<3' )

  if ( g.scene.skip.ff ) g.tL.b.call( setScene, [ n ], '>' )

  return true
}

export { scene09, setScene09 }
