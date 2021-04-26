import { TimelineMax as TL } from 'gsap'

import g from '../glob'
import { setAddOn, setClearActor } from '../utils'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { obscure } from '../obscuro'


const scene05 = 'Distill Gankyil / Way Down in the Hole'

const setScene05 = () => {
  const sceneTL = new TL({ defaults: { overwrite: 'auto' } })


  return true
}

export { scene05, setScene05 }
