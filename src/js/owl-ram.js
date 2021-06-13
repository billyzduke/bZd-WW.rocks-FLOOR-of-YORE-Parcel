import { gsap } from 'gsap'

import assRamIconHornRoll00 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-00.png'
import assRamIconHornRoll01 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-01.png'
import assRamIconHornRoll02 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-02.png'
import assRamIconHornRoll03 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-03.png'
import assRamIconHornRoll04 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-04.png'
import assRamIconHornRoll05 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-05.png'
import assRamIconHornRoll06 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-06.png'
import assRamIconHornRoll07 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-07.png'
import assRamIconHornRoll08 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-08.png'
import assRamIconHornRoll09 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-09.png'
import assRamIconHornRoll10 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-10.png'
import assRamIconHornRoll11 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-11.png'
import assRamIconHornRoll12 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-12.png'
import assRamIconHornRoll13 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-13.png'
import assRamIconHornRoll14 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-14.png'
import assRamIconHornRoll15 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-15.png'
import assRamIconHornRoll16 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-16.png'
import assRamIconHornRoll17 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-17.png'
import assRamIconHornRoll18 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-18.png'
import assRamIconHornRoll19 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-19.png'
import assRamIconHornRoll20 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-20.png'
import assRamIconHornRoll21 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-21.png'
import assRamIconHornRoll22 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-22.png'
import assRamIconHornRoll23 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-23.png'
import assRamIconHornRoll24 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-24.png'
import assRamIconHornRoll25 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-25.png'
import assRamIconHornRoll26 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-26.png'
import assRamIconHornRoll27 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-27.png'
import assRamIconHornRoll28 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-28.png'
import assOwlBeak01 from 'url:/src/img/owl/owlBeak-01.png'
import assOwlBeak02 from 'url:/src/img/owl/owlBeak-02.png'
import assOwlBeak03 from 'url:/src/img/owl/owlBeak-03.png'
import g from '/src/js/glob'
import {
  convertTextToBinary, ifFunctionThenCall, isFunction, gsapTick,
} from '/src/js/utils'
import { printOutBinary } from './folklore'
import { activateSubScene, subSceneProgress } from './scenes'

const setRamIcon = () => {
  g.ramIcon = {
    forCleanUp: [],
  }

  const assRamIconHornRollFrames = [
    assRamIconHornRoll00,
    assRamIconHornRoll01,
    assRamIconHornRoll02,
    assRamIconHornRoll03,
    assRamIconHornRoll04,
    assRamIconHornRoll05,
    assRamIconHornRoll06,
    assRamIconHornRoll07,
    assRamIconHornRoll08,
    assRamIconHornRoll09,
    assRamIconHornRoll10,
    assRamIconHornRoll11,
    assRamIconHornRoll12,
    assRamIconHornRoll13,
    assRamIconHornRoll14,
    assRamIconHornRoll15,
    assRamIconHornRoll16,
    assRamIconHornRoll17,
    assRamIconHornRoll18,
    assRamIconHornRoll19,
    assRamIconHornRoll20,
    assRamIconHornRoll21,
    assRamIconHornRoll22,
    assRamIconHornRoll23,
    assRamIconHornRoll24,
    assRamIconHornRoll25,
    assRamIconHornRoll26,
    assRamIconHornRoll27,
    assRamIconHornRoll28,
  ]
  const assOwlBeakFrames = [ assOwlBeak01, assOwlBeak02, assOwlBeak03 ]

  g.ramIcon.horns = {
    both: 0,
    L: {
      from: assRamIconHornRollFrames.length - 1,
      to: 0,
    },
    R: {
      from: assRamIconHornRollFrames.length - 1,
      to: 0,
    },
  }
  g.qss.ramIconHorns = {
    both: [],
    L: [],
    R: [],
  }
  g.owl = {
    caw: 0,
    open: true,
    slow: 1,
  }
  g.qss.owl = []

  if ( g.el.ramIconHornLeft && g.el.ramIconHornRight ) {
    assRamIconHornRollFrames.forEach( assRam => {
      const ramIconHornFrameL = g.document.createElement( 'img' )
      const ramIconHornFrameR = g.document.createElement( 'img' )
      ramIconHornFrameL.src = ramIconHornFrameR.src = assRam
      ramIconHornFrameL.classList.add( 'ramIconHornFrame', 'ramIconHornFrameL' )
      ramIconHornFrameR.classList.add( 'ramIconHornFrame', 'ramIconHornFrameR' )
      g.el.ramIconHornLeft.appendChild( ramIconHornFrameL )
      g.el.ramIconHornRight.appendChild( ramIconHornFrameR )
      g.qss.ramIconHorns.both.push( gsap.quickSetter( [ ramIconHornFrameL, ramIconHornFrameR ], 'opacity' ) )
      g.qss.ramIconHorns.L.push( gsap.quickSetter( ramIconHornFrameL, 'opacity' ) )
      g.qss.ramIconHorns.R.push( gsap.quickSetter( ramIconHornFrameR, 'opacity' ) )
    } )
  }

  if ( g.el.owlBeak ) {
    assOwlBeakFrames.forEach( assBeak => {
      const beakFrame = g.document.createElement( 'img' )
      beakFrame.src = assBeak
      beakFrame.classList.add( 'owlBeakFrame' )
      g.el.owlBeak.appendChild( beakFrame )
      g.qss.owl.push( gsap.quickSetter( beakFrame, 'opacity' ) )
    } )
  }
}

const rollEmOut = () => {
  if ( !g.subScene.scene11.ss.active ) {
    activateSubScene( 'scene11', 'folklore', 'unrollRam' )
    g.ramIcon.forCleanUp.ready.forEach( cleanUp => {
      ifFunctionThenCall( cleanUp )
    } )
    gsap.set( '#theOwlIsNotWhatItSeems', {
      cursor: 'auto',
    } )
    gsap.set( '#ramIcon', {
      cursor: 'wait',
    } )
    g.ramIcon.unTick = gsapTick( ramIconHornsRollOutTick )
    gsap.set( '#theOwlIsNotWhatItSeems', {
      attr: {
        class: 'open',
      },
    } )
  }
}

const ramIconHornsRollOutTick = () => {
  const nextHornRollFrame = g.ramIcon.horns.both + 1
  if ( g.qss.ramIconHorns.both[nextHornRollFrame] ) {
    if ( g.qss.ramIconHorns.both[g.ramIcon.horns.both] ) g.qss.ramIconHorns.both[g.ramIcon.horns.both]( 0 )
    g.qss.ramIconHorns.both[nextHornRollFrame]( 1 )
    g.ramIcon.horns.both = nextHornRollFrame
  } else if ( g.subScene.scene11.folklore.progress === 'unrollRam' ) {
    ifFunctionThenCall( g.ramIcon.unTick )
    subSceneProgress( 'scene11', 'folklore', 'ramUnrolled' )
    const textLyrics = "The cows are coming home for dinner/The cynic's circus slops their trough with memes/They'll never deign to touch the feed I pour for them again/They'll starve themselves awaiting greener dreams/The zeitgeist is in need of reupholstering/We shabby dolls bereft of dopamine/A cop in every kitchen and a chef in every pot/All our streets paved o'er with baby bumps/We've made ourselves immune to revolution/Wittgenstein escaped in a balloon/Our actions speak so loud that we can't hear the words no more/Binary folklore/Engraven on all fours/You've just enough blood left to paint the door/Gone are the days of yore/Gone are the days of yore/They won't be back no more/Gone are the days of yore"
    subSceneProgress( 'scene11', 'folklore', 'prepLyrics' )
    const binaryLyricsUnspaced = convertTextToBinary( textLyrics ).replace( /\s/g, '' )
    printOutBinary( binaryLyricsUnspaced )
  }
}

const rollEmInInc = ( horn, rollAmount ) => {
  g.ramIcon.horns[horn].to = g.scene.skip.ff ? 0 : g.ramIcon.horns[horn].from - rollAmount
  g.ramIcon.unTick = gsapTick( horn === 'L' ? rollEmInIncTickL : rollEmInIncTickR )
}
const rollEmInIncTickL = () => {
  ramIconHornsRollInIncTick( 'L' )
}
const rollEmInIncTickR = () => {
  ramIconHornsRollInIncTick( 'R' )
}
const ramIconHornsRollInIncTick = horn => {
  const nextHornRollFrame = g.ramIcon.horns[horn].from - 1
  if ( g.ramIcon.horns[horn].from > g.ramIcon.horns[horn].to && g.qss.ramIconHorns[horn][nextHornRollFrame] ) {
    if ( g.qss.ramIconHorns[horn][g.ramIcon.horns[horn].from] ) g.qss.ramIconHorns[horn][g.ramIcon.horns[horn].from]( 0 )
    g.qss.ramIconHorns[horn][nextHornRollFrame]( 1 )
    g.ramIcon.horns[horn].from = nextHornRollFrame
  } else ifFunctionThenCall( g.ramIcon.unTick )
}

const owlCawTick = () => {
  if ( g.owl.slow === 2 ) {
    let nextBeakFrame
    switch ( g.owl.caw ) {
      case -1:
        g.owl.open = !g.owl.open
        nextBeakFrame = 0
        break
      case 0:
      case 1:
        nextBeakFrame = g.owl.open ? g.owl.caw + 1 : g.owl.caw - 1
        break
      case 2:
        g.owl.open = !g.owl.open
        nextBeakFrame = 1
    }
    if ( isFunction( g.qss.owl[g.owl.caw] ) ) g.qss.owl[g.owl.caw]( 0 )
    if ( isFunction( g.qss.owl[nextBeakFrame] ) ) g.qss.owl[nextBeakFrame]( 1 )
    g.owl.caw = nextBeakFrame
    g.owl.slow = 1
  } else g.owl.slow++
}

export {
  owlCawTick, rollEmInInc, rollEmOut, setRamIcon,
}
