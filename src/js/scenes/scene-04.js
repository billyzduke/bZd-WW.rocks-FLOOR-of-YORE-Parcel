import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'


const scene04 = 'Raise Curtain / Reveal Cauldron of Bronze'

const setScene04 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })


  return true
}

export { scene04, setScene04 }
