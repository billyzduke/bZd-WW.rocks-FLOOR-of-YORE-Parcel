import { TimelineMax as TL } from 'gsap'

import assCurtainSectionMask from 'url:/src/img/curtains/curtain-section-mask.svg'
import assCurtainPeekMask from 'url:/src/img/curtains/curtains-peek-mask.svg'
import g from '../glob'
import { gsapTick, setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'
import { blurCrtnsTick } from '../curtains'
import { evadeMouseTick } from '../baubles/layer-01'

const scene02 = 'Blur Curtain / Bauble Layer 01'

const setScene02 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  g.scene.forCleanUp[2].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(3))
  g.scene.forCleanUp[2].blurCtrnsTicker = gsapTick(blurCrtnsTick)
  g.scene.forCleanUp[2].evadeMouseTicker = gsapTick(evadeMouseTick)
  g.scene.forCleanUp[2].clearTitles = () => setClearActor('#tpTitles')

  if (!g.scene.skip.ff) obscure(2.42)
  else sceneTL.timeScale(1 / g.scene.skip.ff)

  sceneTL.to('#tpTitles', {
    duration: 3.24,
    ease: 'power3.in',
    opacity: 0,
    WebkitFilter: 'blur(100px)',
    filter: 'blur(100px)',
    scaleX: 1.75,
    scaleY: 10,
    translateY: '-150%',
  })
    .fromTo('#tpTitleExplore', {
      WebkitFilter: 'grayscale(0)',
      filter: 'grayscale(0)',
    }, {
      duration: 1.5,
      ease: 'power3.in',
      WebkitFilter: 'grayscale(1)',
      filter: 'grayscale(1)',
    }, '<')
    .set('.crtn', {
      maskImage: `url(${assCurtainSectionMask})`,
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskSize: '100% 100%',
    }, '<')
    .set('.cc', {
      maskImage: `url(${assCurtainPeekMask})`,
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskSize: '1080px 1080px',
    }, '<')
    .to('#bL01', {
      duration: 3,
      opacity: 1,
    }, '<')
    .set('#tpTitles', {
      pointerEvents: 'none',
    }, '<')
    .to('#curtains', {
      duration: 5,
      opacity: 1,
    }, '<')

  if (g.scene.skip.ff) sceneTL.call(setScene, [ 3 ], '>')

  return true
}

export { scene02, setScene02 }
