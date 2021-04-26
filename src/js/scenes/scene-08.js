import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'


const scene08 = 'Sparks Fly / Enter the Lion / Reveal Disco Wall'

const setScene08 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })


  return true
}

export { scene08, setScene08 }
