import g from '../glob'
import { wakeFoetuses } from '../foetuses'
import { setFuture } from '../future'

const scene12 = 'Feed the Foetuses / Future Chimp'

const setScene12 = (c, n) => {
  g.scene.setting = c

  setFuture()
  wakeFoetuses()

  // setSubScenes(c, [ 'future' ])

  return true
}

export { scene12, setScene12 }
