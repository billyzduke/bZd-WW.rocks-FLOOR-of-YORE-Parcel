import { gsap } from 'gsap'

import g from '/src/shared/_'
import { setScene, setSubScenes } from '/src/scenes/_'
import { setSmokes } from '/src/shared/smoke/_'

const scene11 = 'Relieve the Lion / Binary Folklore / Breed Foetuses'

const setScene11 = ( c, n ) => {
  g.scene.setting = c

  setSubScenes( c, [ 'foetusL', 'foetusR', 'folklore' ] )
  setSmokes()

  g.lion.blur2X( {
    opacity: 0,
  } )
  gsap.set( '.lightningRod', {
    opacity: 0,
  } )

  g.el.threshold.classList.add( 'anim' )

  if ( g.scene.skip.ff ) setTimeout( () => setScene( n ), 100 )

  return true
}

export { scene11, setScene11 }
