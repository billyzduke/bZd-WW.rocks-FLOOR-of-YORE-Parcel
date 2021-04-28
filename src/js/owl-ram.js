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
import { convertTextToBinary, setRemoveOn } from './utils'
import { printOutBinary } from './folklore'

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

  g.ramIcon.horns = 0

  if (g.el.ramIconHornLeft && g.el.ramIconHornRight) {
    for (let f = 0; f <= 28; f++) {
      const ramIconHornFrameL = g.document.createElement('img')
      const ramIconHornFrameR = g.document.createElement('img')
      ramIconHornFrameL.src = ramIconHornFrameR.src = ramIconHornRollFrames[f]
      ramIconHornFrameL.classList.add('ramIconHornFrame', 'ramIconHornFrameL')
      ramIconHornFrameR.classList.add('ramIconHornFrame', 'ramIconHornFrameR')
      g.el.ramIconHornLeft.appendChild(ramIconHornFrameL)
      g.el.ramIconHornRight.appendChild(ramIconHornFrameR)
      g.qss.ramIconHorns.push(gsap.quickSetter([ ramIconHornFrameL, ramIconHornFrameR ], 'opacity'))
    }
  }
}

const ramIconHornsRollOut = () => {
  const nextHornRollFrame = g.ramIcon.horns + 1
  if (g.qss.ramIconHorns[nextHornRollFrame]) {
    if (g.qss.ramIconHorns[g.ramIcon.horns]) g.qss.ramIconHorns[g.ramIcon.horns](0)
    g.qss.ramIconHorns[nextHornRollFrame](1)
    g.ramIcon.horns = nextHornRollFrame
  } else {
    gsap.ticker.remove(ramIconHornsRollOut)
    g.folklore.binary.progress = 'lyricsPrep'
    const textLyrics = "The cows are coming home for dinner/The cynic's circus slops their trough with memes/They'll never deign to touch the feed I pour for them again/They'll starve themselves awaiting greener dreams/The zeitgeist is in need of reupholstering/We shabby dolls bereft of dopamine/A cop in every kitchen and a chef in every pot/All our streets paved o'er with baby bumps/We've made ourselves immune to revolution/Wittgenstein escaped in a balloon/Our actions speak so loud that we can't hear the words no more/Binary folklore/Engraven on all fours/You've just enough blood left to paint the door/Gone are the days of yore/Gone are the days of yore/They won't be back no more/Gone are the days of yore"
    const binaryLyricsUnspaced = convertTextToBinary(textLyrics).replace(/\s/g, '')
    g.folklore.binary.progress = 'lyricsPrint'
    // setTimeout(() => {
    printOutBinary(binaryLyricsUnspaced)
    // }, 1242)
  }
}
const ramIconHornsRollIn = () => {
  const nextHornRollFrame = g.ramIcon.horns - 1
  if (g.qss.ramIconHorns[nextHornRollFrame]) {
    if (g.qss.ramIconHorns[g.ramIcon.horns]) g.qss.ramIconHorns[g.ramIcon.horns](0)
    g.qss.ramIconHorns[nextHornRollFrame](1)
    g.ramIcon.horns = nextHornRollFrame
  } else {
    gsap.ticker.remove(ramIconHornsRollIn)
    const switcherooTL = new TL()
    switcherooTL.to('#theOwl', {
      duration: 2,
      ease: 'power2.inOut',
      scale: 1,
    }, 0.5)
      .to('#theRamBack, #theRam', {
        duration: 2,
        ease: 'power2.inOut',
        scale: 0,
      }, '<')
  }
}

const rollEmIn = () => {
  gsap.ticker.add(ramIconHornsRollIn)
}

const rollEmOut = () => {
  if (!g.subSceneActive) {
    g.subSceneActive = true
    g.folklore.binary.progress = 'ramPrep'
    setRemoveOn('#ramIcon', 'click', rollEmOut, 'wait')
    gsap.ticker.add(ramIconHornsRollOut)
    gsap.set('#theOwlIsNotWhatItSeems', {
      attr: {
        class: 'open',
      },
    })
  }
}

export { rollEmIn, rollEmOut, setRamIconHorns }
