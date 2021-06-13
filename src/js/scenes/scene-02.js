import { TimelineMax as TL } from 'gsap'

import assCurtainSectionMask from 'url:/src/img/curtains/curtain-section-mask.svg'
import assCurtainPeekMask from 'url:/src/img/curtains/curtains-peek-mask.svg'
import g from '/src/js/glob'
import { gsapTick, setAddOn, setClearActors } from '/src/js/utils'
import { setScene } from '.'
import { obscureGrandiose } from '../obscuro'
import { blurCrtnsTick } from '../curtains'
import { evadeMouseTick } from '../baubles/layer-01'

const scene02 = 'Blur Curtain / Bauble Layer 01'

const setScene02 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].ctrRingClick = setAddOn( '#ctrRing', 'click', () => setScene( n ) )
  g.scene.forCleanUp[c].blurCtrnsTicker = gsapTick( blurCrtnsTick )
  g.scene.forCleanUp[c].evadeMouseTicker = gsapTick( evadeMouseTick )
  g.scene.forCleanUp[c].clearTitles = () => setClearActors( '#tpTitles' )
  g.scene.forCleanUp[c].obscureNextScene = () => obscureGrandiose( 2 )

  g.tL.wtf = new TL( { defaults: { overwrite: 'auto' } } )
  g.tL.wtf.to( '#tpTitles', {
    duration: g.scene.skip.ff || 3.24,
    ease: 'power3.in',
    opacity: 0,
    WebkitFilter: 'blur(100px)',
    filter: 'blur(100px)',
    scaleX: 1.75,
    scaleY: 10,
    translateY: '-150%',
  } )
    .fromTo( '#tpTitleExplore', {
      WebkitFilter: 'grayscale(0)',
      filter: 'grayscale(0)',
    }, {
      duration: g.scene.skip.ff || 1.5,
      ease: 'power3.in',
      WebkitFilter: 'grayscale(1)',
      filter: 'grayscale(1)',
    }, '<' )
    .set( '.crtn', {
      maskImage: `url(${assCurtainSectionMask})`,
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskSize: '100% 100%',
    }, '<' )
    .set( '.cc', {
      maskImage: `url(${assCurtainPeekMask})`,
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskSize: `${g.crtns.h}px ${g.crtns.h}px`,
    }, '<' )
    .to( '#bL01', {
      duration: g.scene.skip.ff || 3,
      opacity: 1,
    }, '<' )
    .set( '#tpTitles', {
      pointerEvents: 'none',
    }, '<' )
    .to( '#curtains', {
      duration: g.scene.skip.ff || 5,
      opacity: 1,
    }, '<' )

  if ( g.scene.skip.ff ) g.tL.yore.call( setScene, [ n ], '>' )

  return true
}

export { scene02, setScene02 }
