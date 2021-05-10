import g from '../glob'
import { setScene, setSubScenes } from '../scene'
import { wakeFoetuses } from '../foetuses'
import { setAddOn } from '../utils'

const scene12 = 'Feed the Foetuses / Future Chimp'

const setScene12 = (c, n) => {
  g.scene.setting = c
  wakeFoetuses()

  setSubScenes(c, [ 'future' ])

  return true
}

export { scene12, setScene12 }
