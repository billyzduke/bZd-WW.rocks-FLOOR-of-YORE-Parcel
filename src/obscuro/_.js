import { TimelineMax as TL } from 'gsap'
import { ifFunctionThenCall } from '/src/shared/utils'

import g from '/src/shared/_'

const obscure = ( forSecs = 1 ) => {
  if ( !g.scene.skip.ff ) {
    g.obscure = true
    const obscureTL = new TL( { defaults: { overwrite: false } } )
    obscureTL.set( '#obscuro', {
      pointerEvents: 'auto',
    } )
      // .to('#helpToggle', {
      //   duration: 0.5,
      //   opacity: 0,
      // }, '<')
      .set( '#obscuro', {
        pointerEvents: 'none',
        onComplete: function () {
          g.obscure = false
        },
      }, `<${forSecs}` )
    // .to('#helpToggle', {
    //   duration: 0.5,
    //   opacity: 0.24,
    // }, '<')
  }
  return true
}

const obscureGrandiose = ( talkToTheHand = 1 ) => {
  if ( !g.scene.skip.ff ) {
    g.obscure = true
    const obscureTL = new TL( { defaults: { overwrite: false } } )
    obscureTL.set( '#obscuro', {
      pointerEvents: 'auto',
    } )
      .to( '#helpToggle', {
        duration: 0.5,
        opacity: 0,
      }, '<' )
      .to( '#obscuro, #greenThumb', {
        duration: 1,
        ease: 'power2',
        opacity: 1,
      }, '<' )
      .to( '#greenThumb', {
        duration: 0.5,
        ease: 'power2.in',
        opacity: 0,
      }, '>' )
      .to( '#redHand, #obscuroGlo', {
        duration: 0.5,
        ease: 'power2',
        opacity: 1,
        repeat: talkToTheHand * 2 - 1,
        yoyo: true,
      }, '>' )
      .to( '#greenHand', {
        duration: 0.5,
        ease: 'power2',
        opacity: 1,
      }, '>' )
      .set( '#obscuro', {
        pointerEvents: 'none',
      }, '<0.25' )
      .to( '#obscuro, #greenHand', {
        duration: 1,
        ease: 'power2.in',
        opacity: 0,
      }, '<0.25' )
      .to( '#helpToggle', {
        duration: 0.5,
        opacity: 0.24,
        onComplete: function () {
          g.obscure = false
        },
      }, '>' )
  }
  return true
}

const obscureThen = callBack => {
  if ( g.scene.skip.ff || g.obscure ) ifFunctionThenCall( callBack )
  else {
    g.obscure = true
    const obscureTL = new TL( { defaults: { overwrite: false } } )
    obscureTL.set( '#obscuro', {
      pointerEvents: 'auto',
    } )
      .to( '#helpToggle', {
        duration: 0.5,
        opacity: 0,
      }, '<' )
      .to( '#obscuro, #greenThumb', {
        duration: 1,
        ease: 'power2',
        opacity: 1,
      }, '<' )
      .to( '#greenThumb', {
        duration: 0.5,
        ease: 'power2.in',
        opacity: 0,
      }, '>' )
      .to( '#redHand, #obscuroGlo', {
        duration: 0.5,
        ease: 'power2',
        opacity: 1,
        onComplete: function () {
          ifFunctionThenCall( callBack )
        },
      }, '>' )
  }
  return true
}

const deObscureThen = callBack => {
  if ( g.scene.skip.ff || !g.obscure ) ifFunctionThenCall( callBack )
  else {
    const obscureTL = new TL( { defaults: { overwrite: false } } )
    obscureTL.to( '#redHand, #obscuroGlo', {
      duration: 0.5,
      ease: 'power2',
      opacity: 0,
    } )
      .to( '#greenHand', {
        duration: 0.5,
        ease: 'power2',
        opacity: 1,
      }, '>' )
      .set( '#obscuro', {
        pointerEvents: 'none',
      }, '<0.25' )
      .to( '#obscuro, #greenHand', {
        duration: 1,
        ease: 'power2.in',
        opacity: 0,
      }, '<0.25' )
      .to( '#helpToggle', {
        duration: 0.5,
        opacity: 0.24,
        onComplete: function () {
          g.obscure = false
          ifFunctionThenCall( callBack )
        },
      }, '>' )
  }
}

export {
  deObscureThen, obscure, obscureGrandiose, obscureThen,
}
