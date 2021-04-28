import g from '../glob'
// eslint-disable-next-line import/no-cycle
import { setScene } from '../scene'
import { relieveTheLion } from '../lion'

const scene11 = 'Relieve the Lion / Lightning Rods Off'

const setScene11 = (c, n) => {
  relieveTheLion()

  g.el.threshold.classList.add('anim')

  g.subScenes[c] = {
    owlRamBinaryFolklore: false,
    handEyeFoetuses: false,
  }

  if (g.scene.skip.ff) setTimeout(() => setScene(n), 100)

  return true
}

export { scene11, setScene11 }
