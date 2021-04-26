import { gsap, TimelineMax as TL } from 'gsap'

import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'
import { blurCrtns } from '../curtains'

const scene02 = 'Blur Curtain / Bauble Layer 01'

const setScene02 = (el, scene) => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  scene.cleanUp.push(setAddOn('#ctrRing', 'click', () => setScene(el, scene, 3)))
  scene.cleanUp.push(blurCrtns())
  setAddOn('#ctrRing', 'click', setScene[3])
  gsap.ticker.add(blurCrtnsTick)
  gsap.ticker.add(evadeMouseTick)

  if (!scene.skipDur) obscure(2.42)
  sceneTL.to('#tpTitles', {
    duration: scene.skipDur || 3.24,
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
      duration: scene.skipDur || 1.5,
      ease: 'power3.in',
      WebkitFilter: 'grayscale(1)',
      filter: 'grayscale(1)',
    }, '<')
    .set('.crtn', {
      maskImage: 'url(ass/vect/curtainMasks/curtain-section-mask.svg)',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskSize: '100% 100%',
    }, '<')
    .set('.cc', {
      maskImage: 'url(ass/vect/curtainMasks/curtains-peek-mask.svg)',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskSize: '1080px 1080px',
    }, '<')
    .to('#bL01', {
      duration: scene.skipDur || 3,
      opacity: 1,
    }, '<')
    .set('#tpTitles', {
      pointerEvents: 'none',
    }, '<')
    .to('#curtains', {
      duration: scene.skipDur || 5,
      opacity: 1,
    }, '<')
    .call(setClearActor, [ '#tpTitles' ], '>')
}

export { scene02, setScene02 }
