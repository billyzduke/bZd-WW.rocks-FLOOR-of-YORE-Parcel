import { TimelineMax as TL } from 'gsap'

import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { setBaubleLayer01 } from '../bauble-layer-01'
import { obscure } from '../obscuro'

const scene01 = 'EXPLORE'

const setScene01 = (el, scene) => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  scene.cleanUp.push(setAddOn('#tpTitles', 'click', () => setScene(el, scene, 2)))

  setBaubleLayer01(el)

  if (!scene.skipDur) obscure(scene, 3)

  sceneTL.to('#tpTitleYore', {
    duration: scene.skipDur || 3,
    opacity: 0,
  })
    .to('#tpTitleExplore', {
      duration: scene.skipDur || 3,
      opacity: 1,
    }, '<')

  return true
}

export { scene01, setScene01 }
