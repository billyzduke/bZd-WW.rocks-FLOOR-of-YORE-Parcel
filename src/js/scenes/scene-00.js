import { TimelineMax as TL } from 'gsap'

import { setAddOn } from '../utils'
import { setScene } from '../scene'

const scene00 = 'Fade In / DAYS OF YORE'

const setScene00 = (el, scene) => {
  const sceneTL = new TL()
  sceneTL.to('#tpTitleScreen', {
    duration: 2,
    opacity: 0,
  })
    .set('#tpTitles', {
      cursor: 'pointer',
    }, '>')
    .call(setAddOn, [ '#tpTitles', 'click', () => setScene(el, scene, 1) ], '>')

  return true
}

export { scene00, setScene00 }
