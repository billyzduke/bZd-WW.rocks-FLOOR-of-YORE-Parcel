import { gsap, TimelineMax as TL } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import g from '/src/js/glob'

gsap.registerPlugin( MotionPathPlugin )

const positionBulb = elTarget => {
  if ( elTarget ) {
    const matrix = MotionPathPlugin.getGlobalMatrix( elTarget )
    const localPoint = { x: 0, y: 0 }
    const globalPoint = matrix.apply( localPoint )
    gsap.set( '#flashBulbWrapper', {
      x: globalPoint.x / g.main.scale,
      y: globalPoint.y / g.main.scale,
    } )
  }
}

const flashBulb = elTarget => {
  if ( elTarget ) positionBulb( elTarget )
  const flashTL = new TL( { defaults: { overwrite: 'auto' } } )
  if ( !g.scene.skip.ff ) {
    flashTL.set( '#flashBulbWrapper', {
      opacity: 1,
      scale: 0,
    } )
      .to( '#flashBulbWrapper', {
        duration: 0.05,
        scale: 2.5,
      }, '>' )
      .to( '#flashBulbWrapper', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
      }, '>' )
  }
}

export { flashBulb }
