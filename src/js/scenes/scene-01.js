import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { setBaubleLayer01 } from '../bauble-layer-01'
import { obscure } from '../obscuro'

const scene01 = 'EXPLORE'

const setScene01 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  g.scene.cleanUp[1].exploreTitleClick = setAddOn('#tpTitles', 'click', () => setScene(2))

  setBaubleLayer01()

  if (!g.scene.skip.dur) obscure(3)

  sceneTL.to('#tpTitleYore', {
    duration: g.scene.skip.dur || 3,
    opacity: 0,
  })
    .to('#tpTitleExplore', {
      duration: g.scene.skip.dur || 3,
      opacity: 1,
    }, '<')

  return true
}

export { scene01, setScene01 }
