import { gsap } from 'gsap'

import g from '/src/shared/_'
import { randOnum } from '/src/shared/utils'
import { devLog } from '/src/shared/dev/_'
import { setScene } from '/src/scenes/_'
import { toggleGemGuy } from './lion-torso/lion-t-shirt/_'
import { toggleLionEyes, toggleLionHalos, toggleLionJarp } from './lion-head/_'
import { toggleLionHands } from './lion-torso/lion-hands/_'
import { shockTick } from '/src/shared/lightning-rods/_'

const toggleLion = forcePause => {
  toggleGemGuy( forcePause )
  toggleLionEyes( forcePause )
  toggleLionHalos( forcePause )
  toggleLionHands( forcePause )
  toggleThreshold( forcePause )
}

const toggleThreshold = forcePause => {
  if ( g.el.threshold.classList.contains( 'anim' ) || forcePause ) {
    g.el.threshold.classList.remove( 'anim' )
    devLog( 'threshold animations paused' )
  } else {
    g.el.threshold.classList.add( 'anim' )
    devLog( 'threshold animations active' )
  }
  if ( g.el.theOwl.classList.contains( 'seems' ) || forcePause ) {
    g.el.theOwl.classList.remove( 'seems' )
    devLog( 'owl animations paused' )
  } else {
    g.el.theOwl.classList.add( 'seems' )
    devLog( 'owl animations active' )
  }
}

const setLion = () => {
  if ( g.el.lolf01 && g.el.lolf02 && g.el.lionHead ) {
    g.window.scrollTo( 0, 0 )
    gsap.set( [ g.el.lolf01, g.el.lolf02 ], {
      translateX: ( g.main.w - 1220 ) / 2,
      // scale: g.main.scale * 0.7709,
    } )
    if ( g.scene.current < 8 && g.el.theLion ) {
      gsap.set( g.el.theLion, {
        rotation: -2880,
        scale: 0,
        transformOrigin: '325px 714px',
      } )
    }
    g.lion.eyes.followMouseQuickSetter = gsap.quickSetter( '.lionEye', 'css' )
    g.lion.eyes.active = false
    // psychHalos have to animate a little bit before first rollover or it looks fuct
    toggleLionJarp() // they get toggled off again when scene 1 is set
  }
}

const shockTheLion = () => {
  devLog( 'shock the lion' )
  g.lion.blur2X = gsap.quickSetter( '#lionBlur2', 'css' )
}

const lionShockTick = () => {
  g.lion.blur2X( {
    left: `${randOnum() ? '' : '-'}${randOnum( 12, 20 )}px`,
    opacity: randOnum( 42, 76 ) / 100,
  } )
  shockTick()
}

const relieveTheLion = () => {
  setScene( 11 )
}

// eslint-disable-next-line object-curly-newline
export { lionShockTick, relieveTheLion, setLion, shockTheLion, toggleLion }
