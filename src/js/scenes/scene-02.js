import { TimelineMax as TL } from 'gsap'

import assCurtainSectionMask from 'url:/src/img/curtains/curtain-section-mask.svg'
import assCurtainPeekMask from 'url:/src/img/curtains/curtains-peek-mask.svg'
import g from '../glob'
import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'
import { blurCrtns } from '../curtains'
import { evadeMouse } from '../baubles/layer-01'

const scene02 = 'Blur Curtain / Bauble Layer 01'

const setScene02 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  g.scene.cleanUp[2].ctrRingClick = setAddOn('#ctrRing', 'click', () => setScene(3))
  g.scene.cleanUp[2].blurCtrnsTicker = blurCrtns()
  g.scene.cleanUp[2].evadeMouseTicker = evadeMouse()

  if (!g.scene.skip.dur) obscure(2.42)
  sceneTL.to('#tpTitles', {
    duration: g.scene.skip.dur || 3.24,
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
      duration: g.scene.skip.dur || 1.5,
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
      duration: g.scene.skip.dur || 3,
      opacity: 1,
    }, '<')
    .set('#tpTitles', {
      pointerEvents: 'none',
    }, '<')
    .to('#curtains', {
      duration: g.scene.skip.dur || 5,
      opacity: 1,
    }, '<')
    .call(setClearActor, [ '#tpTitles' ], '>')

  return true
}

export { scene02, setScene02 }
