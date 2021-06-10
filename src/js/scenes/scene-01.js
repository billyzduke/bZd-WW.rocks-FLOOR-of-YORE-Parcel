import g from '../glob'
import { setAddOn } from '../utils'
import { setScene } from '.'
import { obscure } from '../obscuro'
import { setCtrRing } from '../baubles/layer-01'
import { toggleLionJarp } from '../lion-head'

const scene01 = 'EXPLORE'

const setScene01 = ( c, n ) => {
  g.scene.setting = c
  g.scene.forCleanUp[c].obscureNextScene = () => obscure( 2.42 )

  toggleLionJarp()
  setCtrRing()

  g.tL.yore.to( '#tpTitleYore', {
    duration: 3,
    opacity: 0,
  } )
    .to( '#tpTitleExplore, #photoSensitivityWarning', {
      duration: 3,
      onComplete: function () {
        g.scene.forCleanUp[c].exploreTitleClick = setAddOn( '#tpTitles', 'click', () => setScene( n ), 'pointer', 'wait' )
      },
      opacity: 1,
    }, '<' )

  if ( g.scene.skip.ff ) g.tL.yore.call( setScene, [ n ], '>' )

  return true
}

export { scene01, setScene01 }
