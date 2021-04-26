import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'


const scene09 = 'Wake Up GemGuy / Bauble Layer 02'

const setScene09 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })


  return true
}

export { scene09, setScene09 }
