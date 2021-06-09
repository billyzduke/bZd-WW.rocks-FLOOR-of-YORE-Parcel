import { gsap, TimelineMax as TL } from 'gsap'

import g from './glob'
import {
  devLog, gsapTick, ifFunctionThenCall, setAddOn,
} from './utils'
import {
  bloodSplashL, bloodSplashR, closeFoetusEye, openFoetusEye,
} from './foetuses'
import { activateSubScene, setScene, subSceneProgress } from './scene'
import { animateBaubleLayer03or04 } from './baubles/layer-04'

const toggleLionHands = forcePause => {
  if ( g.el.handEyeWrapper.classList.contains( 'blink' ) || forcePause ) {
    gsap.set( '.handEyeWrapper', {
      attr: {
        class: `handEyeWrapper${g.scene.current < 11 ? '' : ' open'}`,
      },
    } )
    devLog( 'lionHands animations paused' )
  } else {
    gsap.set( '.handEyeWrapper', {
      attr: {
        class: 'handEyeWrapper blink',
      },
    } )
    devLog( 'lionHands animations active' )
  }
}

const setLionHands = () => {
  // When referencing the lion's hands and the eyes they contain, the designators "Left" & "Right"
  //    refer to positions relative to the lion itself, i.e., as if they were your own hands
  // When referencing all subsequent animations that spring forth from the lion's hand's eyes,
  //    directional labels are THEREAFTER FLIPPED, now referring to
  //    their orientation / position relative to the screen facing the viewer
  setAddOn( '#handEyeLeft, #saySinan', 'mouseenter', saySinan, false )
  setAddOn( '#handEyeLeft, #saySinan', 'mouseleave', sayNothing, false )
  setAddOn( '#handEyeRight, #sayCeren', 'mouseenter', sayCeren, false )
  setAddOn( '#handEyeRight, #sayCeren', 'mouseleave', sayNothing, false )
  g.lion.forCleanUp.hands = {
    L: setAddOn( '#saySinan', 'click', bloodDropR ), // The lion's left hand is on the right side of the screen
    R: setAddOn( '#sayCeren', 'click', bloodDropL ), // Likewise, the lion's right hand is on the left side of the screen
  }
  toggleLionHands()
}

const say = ( who, what ) => {
  if ( g.el.theLion.classList.contains( 'anim' ) ) {
    who.forEach( sayWhat => {
      if ( what ) {
        sayWhat.classList.add( 'saySaySay' )
      } else {
        sayWhat.classList.remove( 'saySaySay' )
      }
    } )
  }
}

const saySinan = () => say( [ g.el.saySinan ], 1 )

const sayCeren = () => say( [ g.el.sayCeren ], 1 )

const sayNothing = () => say( [ g.el.saySinan, g.el.sayCeren ], 0 )

const bloodDrop = side => {
  if ( !g.foetus[side].drop ) {
    g.foetus[side].drop = true
    const whichHandEye = side === 'L' ? g.el.sayCeren : g.el.saySinan
    const tearTL = new TL( { defaults: { overwrite: 'auto' } } )
    if ( g.subScene.scene11[`foetus${side}`].ff ) tearTL.timeScale( 1 / g.subScene.scene11[`foetus${side}`].ff )
    tearTL.set( whichHandEye, {
      cursor: 'no-drop',
    }, '>' )
      .set( `#womb${side}`, {
        rotateZ: side === 'L' ? 592 : -592,
      }, '>' )
      .to( `#bloodDrop${side}`, {
        duration: 0.75,
        ease: 'power1.in',
        scale: 1,
      }, '>' )
      .to( `#bloodDrop${side}`, {
        duration: 3,
        ease: 'power2.in',
        translateY: `+=${side === 'L' ? 444 : 446}`,
      }, '>' )
      .to( `#womb${side}`, {
        duration: 3,
        ease: 'power3.in',
        translateX: side === 'L' ? 46 : 462,
        translateY: side === 'L' ? 207 : 211,
      }, '<' )
      .to( `#bloodDrop${side}`, {
        duration: 2,
        ease: 'power2.in',
        scale: 6,
      }, '<1' )
      .to( `#womb${side}`, {
        duration: 2,
        ease: 'power2.in',
        onComplete: () => {
          g.foetus.bin.blood.push( gsapTick( side === 'L' ? bloodSplashL : bloodSplashR ) )
          g.foetus.bin.eye[side].push( setAddOn( `#womb${side}`, 'mouseenter', () => openFoetusEye( side ), 'wait' ), setAddOn( `#womb${side}`, 'mouseleave', () => closeFoetusEye( side ), 'wait' ) )
        },
        opacity: 0.52,
        rotateZ: side === 'L' ? 232 : -240,
        scale: side === 'L' ? 0.87 : 0.85,
      }, '<' )
      .to( `#bloodDrop${side}`, {
        duration: 0.15,
        onComplete: () => {
          animateBaubleLayer03or04( side, g.subScene.scene11[`foetus${side}`].ff )
          subSceneProgress( 'scene11', `foetus${side}`, 'complete' )
          if ( !g.scene.skip.ff && g.subScene.scene11[`foetus${side === 'L' ? 'R' : 'L'}`].progress === 'complete' && g.subScene.scene11.folklore.progress === 'complete' ) setScene( 12 )
        },
        opacity: 0,
        scaleY: 0.2,
        translateY: 670,
      }, '<2' )
      .to( `#womb${side}`, {
        duration: 6,
        ease: 'elastic.out(1, 0.3)',
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        translateX: side === 'L' ? -10 : 503, // may need tweak
      }, '<' )
  }
}

const bloodDropL = () => {
  if ( !g.subScene.scene11.ss.active ) {
    activateSubScene( 'scene11', 'foetusL', 'cryBlood' )
    ifFunctionThenCall( g.lion.forCleanUp.hands.R )
    bloodDrop( 'L' )
  }
}

const bloodDropR = () => {
  if ( !g.subScene.scene11.ss.active ) {
    activateSubScene( 'scene11', 'foetusR', 'cryBlood' )
    ifFunctionThenCall( g.lion.forCleanUp.hands.L )
    bloodDrop( 'R' )
  }
}

export { setLionHands, toggleLionHands }

