import g from '/src/shared/_'
import { wakeFoetuses } from '/src/main-stage/threshold/foetuses/_'
import { setFuture } from '/src/future/_'

const scene12 = 'Agitate Owl / Annoy Foetuses / Flux the Capacitor'

const setScene12 = ( c, n ) => {
  g.scene.setting = c

  setFuture()
  wakeFoetuses()

  return true
}

export { scene12, setScene12 }
