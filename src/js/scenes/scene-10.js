import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'


const scene10 = 'Shock the Lion / Open All Eyes / Release the Owl'

const setScene10 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })


  return true
}

export { scene10, setScene10 }
