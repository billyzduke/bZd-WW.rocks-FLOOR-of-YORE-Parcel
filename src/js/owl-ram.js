import { gsap, TimelineMax as TL } from 'gsap'

import ramIconHornRoll00 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-00.png'
import ramIconHornRoll01 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-01.png'
import ramIconHornRoll02 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-02.png'
import ramIconHornRoll03 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-03.png'
import ramIconHornRoll04 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-04.png'
import ramIconHornRoll05 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-05.png'
import ramIconHornRoll06 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-06.png'
import ramIconHornRoll07 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-07.png'
import ramIconHornRoll08 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-08.png'
import ramIconHornRoll09 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-09.png'
import ramIconHornRoll10 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-10.png'
import ramIconHornRoll11 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-11.png'
import ramIconHornRoll12 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-12.png'
import ramIconHornRoll13 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-13.png'
import ramIconHornRoll14 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-14.png'
import ramIconHornRoll15 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-15.png'
import ramIconHornRoll16 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-16.png'
import ramIconHornRoll17 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-17.png'
import ramIconHornRoll18 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-18.png'
import ramIconHornRoll19 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-19.png'
import ramIconHornRoll20 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-20.png'
import ramIconHornRoll21 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-21.png'
import ramIconHornRoll22 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-22.png'
import ramIconHornRoll23 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-23.png'
import ramIconHornRoll24 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-24.png'
import ramIconHornRoll25 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-25.png'
import ramIconHornRoll26 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-26.png'
import ramIconHornRoll27 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-27.png'
import ramIconHornRoll28 from 'url:/src/img/ramIcon/ramIcon-horn-rollout-28.png'
import g from './glob'
import { convertTextToBinary, gsapTick, setRemoveOn } from './utils'
/* eslint-disable import/no-cycle */
import { printOutBinary } from './folklore'
import { activateSubScene, subSceneProgress } from './scene'
import autoprefixer from 'autoprefixer'
/* eslint-enable import/no-cycle */

const setRamIconHorns = () => {
  const ramIconHornRollFrames = [
    ramIconHornRoll00,
    ramIconHornRoll01,
    ramIconHornRoll02,
    ramIconHornRoll03,
    ramIconHornRoll04,
    ramIconHornRoll05,
    ramIconHornRoll06,
    ramIconHornRoll07,
    ramIconHornRoll08,
    ramIconHornRoll09,
    ramIconHornRoll10,
    ramIconHornRoll11,
    ramIconHornRoll12,
    ramIconHornRoll13,
    ramIconHornRoll14,
    ramIconHornRoll15,
    ramIconHornRoll16,
    ramIconHornRoll17,
    ramIconHornRoll18,
    ramIconHornRoll19,
    ramIconHornRoll20,
    ramIconHornRoll21,
    ramIconHornRoll22,
    ramIconHornRoll23,
    ramIconHornRoll24,
    ramIconHornRoll25,
    ramIconHornRoll26,
    ramIconHornRoll27,
    ramIconHornRoll28,
  ]

  g.ramIcon.horns = {
    both: 0,
    L: {
      from: ramIconHornRollFrames.length - 1,
      to: 0,
    },
    R: {
      from: ramIconHornRollFrames.length - 1,
      to: 0,
    },
  }
  g.qss.ramIconHorns = {
    both: [],
    L: [],
    R: [],
  }

  if (g.el.ramIconHornLeft && g.el.ramIconHornRight) {
    for (let f = 0; f <= 28; f++) {
      const ramIconHornFrameL = g.document.createElement('img')
      const ramIconHornFrameR = g.document.createElement('img')
      ramIconHornFrameL.src = ramIconHornFrameR.src = ramIconHornRollFrames[f]
      ramIconHornFrameL.classList.add('ramIconHornFrame', 'ramIconHornFrameL')
      ramIconHornFrameR.classList.add('ramIconHornFrame', 'ramIconHornFrameR')
      g.el.ramIconHornLeft.appendChild(ramIconHornFrameL)
      g.el.ramIconHornRight.appendChild(ramIconHornFrameR)
      g.qss.ramIconHorns.both.push(gsap.quickSetter([ ramIconHornFrameL, ramIconHornFrameR ], 'opacity'))
      g.qss.ramIconHorns.L.push(gsap.quickSetter(ramIconHornFrameL, 'opacity'))
      g.qss.ramIconHorns.R.push(gsap.quickSetter(ramIconHornFrameR, 'opacity'))
    }
  }
}

const ramIconHornsRollOutTick = () => {
  const nextHornRollFrame = g.ramIcon.horns.both + 1
  if (g.qss.ramIconHorns.both[nextHornRollFrame]) {
    if (g.qss.ramIconHorns.both[g.ramIcon.horns.both]) g.qss.ramIconHorns.both[g.ramIcon.horns.both](0)
    g.qss.ramIconHorns.both[nextHornRollFrame](1)
    g.ramIcon.horns.both = nextHornRollFrame
  } else {
    g.ramIcon.unTick()
    subSceneProgress('scene11', 'folklore', 'ramUnrolled')
    const textLyrics = "The cows are coming home for dinner/The cynic's circus slops their trough with memes/They'll never deign to touch the feed I pour for them again/They'll starve themselves awaiting greener dreams/The zeitgeist is in need of reupholstering/We shabby dolls bereft of dopamine/A cop in every kitchen and a chef in every pot/All our streets paved o'er with baby bumps/We've made ourselves immune to revolution/Wittgenstein escaped in a balloon/Our actions speak so loud that we can't hear the words no more/Binary folklore/Engraven on all fours/You've just enough blood left to paint the door/Gone are the days of yore/Gone are the days of yore/They won't be back no more/Gone are the days of yore"
    subSceneProgress('scene11', 'folklore', 'prepLyrics')
    const binaryLyricsUnspaced = convertTextToBinary(textLyrics).replace(/\s/g, '')
    printOutBinary(binaryLyricsUnspaced)
  }
}

const ramIconHornsRollInIncTick = horn => {
  const nextHornRollFrame = g.ramIcon.horns[horn].from - 1
  if (g.ramIcon.horns[horn].from > g.ramIcon.horns[horn].to && g.qss.ramIconHorns[horn][nextHornRollFrame]) {
    if (g.qss.ramIconHorns[horn][g.ramIcon.horns[horn].from]) g.qss.ramIconHorns[horn][g.ramIcon.horns[horn].from](0)
    g.qss.ramIconHorns[horn][nextHornRollFrame](1)
    g.ramIcon.horns[horn].from = nextHornRollFrame
  } else {
    g.ramIcon.unTick()
    // subSceneProgress('scene11', 'folklore', 'ramRolled')
    // const switcherooTL = new TL()
    // switcherooTL.to('#theOwl', {
    //   duration: 2,
    //   ease: 'power2.inOut',
    //   scale: 1,
    // }, 0.5)
    //   .to('#theRamBack, #theRam', {
    //     duration: 2,
    //     ease: 'power2.inOut',
    //     scale: 0,
    //   }, '<')
  }
}

const rollEmInIncTickL = () => {
  ramIconHornsRollInIncTick('L')
}

const rollEmInIncTickR = () => {
  ramIconHornsRollInIncTick('R')
}

const rollEmInInc = (horn, rollAmount) => {
  g.ramIcon.horns[horn].to = g.ramIcon.horns[horn].from - rollAmount
  g.ramIcon.unTick = gsapTick(horn === 'L' ? rollEmInIncTickL : rollEmInIncTickR)
}

// const rollEmIn = () => {
//   subSceneProgress('scene11', 'folklore', 'rollRam')
//   g.ramIcon.unTick = gsapTick(ramIconHornsRollInTick)
// }

const rollEmOut = () => {
  if (!g.subScene.scene11.active) {
    activateSubScene('scene11', 'folklore', 'unrollRam')
    g.scene.forCleanUp[11].ramOverClickable()
    g.scene.forCleanUp[11].ramOutUnClickable()
    g.scene.forCleanUp[11].ramOverClickable = g.scene.forCleanUp[11].ramOutUnClickable = undefined
    gsap.set('#theOwlIsNotWhatItSeems', {
      cursor: 'auto',
    })
    gsap.set('#ramIcon', {
      cursor: 'wait',
    })
    g.ramIcon.unTick = gsapTick(ramIconHornsRollOutTick)
    gsap.set('#theOwlIsNotWhatItSeems', {
      attr: {
        class: 'open',
      },
    })
  }
}

export { rollEmInInc, rollEmOut, setRamIconHorns }
