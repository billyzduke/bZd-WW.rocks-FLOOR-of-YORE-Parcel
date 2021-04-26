import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { setBaubleLayer01 } from '../baubles/layer-01'

const scene00 = 'Fade In / DAYS OF YORE'

const setScene00 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  g.scene.forCleanUp[0].yoreTitleClick = setAddOn('#tpTitles', 'click', () => setScene(1))

  setBaubleLayer01()

  sceneTL.to('#tpTitleScreen', {
    duration: 2,
    opacity: 0,
  })
    .set('#tpTitles', {
      cursor: 'pointer',
    }, '>')

  return true
}

export { scene00, setScene00 }
