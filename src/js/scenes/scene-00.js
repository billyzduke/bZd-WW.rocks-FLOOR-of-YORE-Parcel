import { TimelineMax as TL } from 'gsap'

import { setAddOn } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'

const scene00 = 'Fade In / DAYS OF YORE'

const setScene00 = (el, scene) => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })
  const toNextScene = () => {
    scene.cleanUp.push(setAddOn('#tpTitles', 'click', () => setScene(el, scene, 1)))
  }

  sceneTL.to('#tpTitleScreen', {
    duration: 2,
    opacity: 0,
  })
    .set('#tpTitles', {
      cursor: 'pointer',
    }, '>')
    .call(toNextScene, [], '>')

  return true
}

export { scene00, setScene00 }
