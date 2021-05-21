import g from '../glob'
import { wakeFoetuses } from '../foetuses'
import { setFuture } from '../future'

const scene12 = 'Agitate Owl / Annoy Foetuses / Flux the Capacitor'

const setScene12 = (c, n) => {
  g.scene.setting = c

  setFuture()
  wakeFoetuses()

  return true
}

export { scene12, setScene12 }
