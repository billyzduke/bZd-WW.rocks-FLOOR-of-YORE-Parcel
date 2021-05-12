import g from '../glob'
import { setSubScenes } from '../scene'
import { wakeFoetuses } from '../foetuses'
import { setAddOn } from '../utils'
import { setFuture } from '../future'
import { eOnFlux } from '../flux'

const scene12 = 'Feed the Foetuses / Future Chimp'

const setScene12 = (c, n) => {
  g.scene.setting = c

  setFuture()
  wakeFoetuses()

  // setSubScenes(c, [ 'future' ])

  return true
}

export { scene12, setScene12 }
