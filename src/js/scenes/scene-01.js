import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'
import { setCtrRing } from '../baubles/layer-01'

const scene01 = 'EXPLORE'

const setScene01 = (c, n) => {
  g.scene.forCleanUp[c].exploreTitleClick = setAddOn('#tpTitles', 'click', () => setScene(n))
  g.scene.forCleanUp[c].obscureNextScene = () => obscure(2.42)

  setCtrRing()

  g.tL.yore.to('#tpTitleYore', {
    duration: 3,
    opacity: 0,
  })
    .to('#tpTitleExplore', {
      duration: 3,
      opacity: 1,
    }, '<')

  if (g.scene.skip.ff) g.tL.yore.call(setScene, [ n ], '>')

  return true
}

export { scene01, setScene01 }
