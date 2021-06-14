import { gsap } from 'gsap'

import g from '/src/shared/_'
import { randoNum } from '/src/shared/utils'

const setFloor = () => {
  if ( g.el.yoreFloor ) {
    gsap.set( g.el.yoreFloor, {
      left: ( g.main.w - Number( g.window.getComputedStyle( g.el.yoreFloor, null ).getPropertyValue( 'width' ).slice( 0, -2 ) ) ) / 2,
      top: ( g.main.h * 0.9 ) - 85,
    } )
  }
}

const scrubTheFloor = () => {
  gsap.to( '#yoreFloorTitle', {
    duration: 1,
    ease: 'back.in',
    translateX: `${randoNum() ? '-' : ''}${g.main.w * 1.5}`,
  } )
}

const readTheFloor = () => {
  if ( ![ 12, 13 ].includes( g.scene.current ) && ( !g.subScene.scene11 || !g.subScene.scene11.folklore || !g.subScene.scene11.folklore.active ) ) {
    gsap.to( '#yoreFloorTitle', {
      duration: 2,
      ease: 'elastic.out',
      onComplete() {
        setTimeout( scrubTheFloor, 4242 )
      },
      translateX: '-50%',
    } )
  }
}

const toggleFloor = forcePause => {
  if ( g.el.yoreFloor.classList.contains( 'anim' ) || forcePause ) {
    g.el.yoreFloor.classList.remove( 'anim' )
  } else {
    g.el.yoreFloor.classList.add( 'anim' )
  }
}

export {
  scrubTheFloor, readTheFloor, setFloor, toggleFloor,
}
