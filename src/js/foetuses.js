import { gsap, TimelineMax as TL } from 'gsap'

import assFoetusEye00 from 'url:/src/img/foetuses/foetusEye-00.png'
import assFoetusEye01 from 'url:/src/img/foetuses/foetusEye-01.png'
import assFoetusEye02 from 'url:/src/img/foetuses/foetusEye-02.png'
import assFoetusEye03 from 'url:/src/img/foetuses/foetusEye-03.png'
import assFoetusEye04 from 'url:/src/img/foetuses/foetusEye-04.png'
import assFoetusCryStart01 from 'url:/src/img/foetuses/foetus-cry-start-01.png'
import assFoetusCryStart02 from 'url:/src/img/foetuses/foetus-cry-start-02.png'
import assFoetusCryStart03 from 'url:/src/img/foetuses/foetus-cry-start-03.png'
import assFoetusCryLoop01 from 'url:/src/img/foetuses/foetus-cry-repeat-01.png'
import assFoetusCryLoop02 from 'url:/src/img/foetuses/foetus-cry-repeat-02.png'
import assFoetusCryLoop03 from 'url:/src/img/foetuses/foetus-cry-repeat-03.png'
import assFoetusCryLoop04 from 'url:/src/img/foetuses/foetus-cry-repeat-04.png'
import assFoetusCryLoop05 from 'url:/src/img/foetuses/foetus-cry-repeat-05.png'
import g from './glob'
import { ifFunctionThenCall, isFunction, randOnum, setAddOn } from './utils'
import { echoCry } from './future'
// import { activateSubScene } from './scene'

const setFoetuses = () => {
  const foetuses = [ 'L', 'R' ]
  g.tL.tearsOfBlood = {}

  const assFoetusEyeFrames = [
    assFoetusEye00,
    assFoetusEye01,
    assFoetusEye02,
    assFoetusEye03,
    assFoetusEye04,
  ]

  const assFoetusCryFrames = {
    loop: [
      assFoetusCryLoop01,
      assFoetusCryLoop02,
      assFoetusCryLoop03,
      assFoetusCryLoop04,
      assFoetusCryLoop05,
    ],
    start: [ assFoetusCryStart01, assFoetusCryStart02, assFoetusCryStart03 ],
  }

  foetuses.forEach(foe => {
    g.foetus[foe] = {
      drop: false,
      eye: 0,
      splash: 0,
      cry: 0,
    }
    g.qss.foetus[foe] = {
      cry: {
        loop: [],
        start: [],
      },
      eye: [],
    }
    g.tL.tearsOfBlood[foe] = new TL({ defaults: { overwrite: 'auto' } })
    if (g.el[`foetusEye${foe}`]) {
      for (let fE = 0; fE <= 5; fE++) {
        if (assFoetusEyeFrames[fE]) {
          const fEyeFrame = g.document.createElement('img')
          fEyeFrame.src = assFoetusEyeFrames[fE]
          fEyeFrame.classList.add('foetusEyeFrame', `fEye${foe}`)
          g.el[`foetusEye${foe}`].appendChild(fEyeFrame)
          g.qss.foetus[foe].eye.push(gsap.quickSetter(fEyeFrame, 'opacity'))
        }
        if (assFoetusCryFrames.start[fE]) {
          const fCryStartFrame = g.document.createElement('img')
          fCryStartFrame.src = assFoetusCryFrames.start[fE]
          fCryStartFrame.classList.add('foetusCryStartFrame', `fCryStart${foe}`)
          g.el[`foetusCry${foe}`].appendChild(fCryStartFrame)
          g.qss.foetus[foe].cry.start.push(gsap.quickSetter(fCryStartFrame, 'opacity'))
        }
        if (assFoetusCryFrames.loop[fE]) {
          const fCryLoopFrame = g.document.createElement('img')
          fCryLoopFrame.src = assFoetusCryFrames.loop[fE]
          fCryLoopFrame.classList.add('foetusCryLoopFrame', `fCryLoop${foe}`)
          g.el[`foetusCry${foe}`].appendChild(fCryLoopFrame)
          g.qss.foetus[foe].cry.loop.push(gsap.quickSetter(fCryLoopFrame, 'opacity'))
        }
      }
    }
  })
}

const openFoetusEyeTick = foe => {
  const nextOpenEyeFrame = g.foetus[foe].eye + 1
  if (g.qss.foetus[foe].eye[nextOpenEyeFrame]) {
    if (g.qss.foetus[foe].eye[g.foetus[foe].eye]) g.qss.foetus[foe].eye[g.foetus[foe].eye](0)
    g.qss.foetus[foe].eye[nextOpenEyeFrame](1)
    g.foetus[foe].eye = nextOpenEyeFrame
  } else {
    gsap.ticker.remove(foe === 'L' ? openFoetusEyeL : openFoetusEyeR)
    if (![ g.scene.current, g.scene.setting ].includes(12)) {
      setTimeout(() => {
        gsap.ticker.add(foe === 'L' ? closeFoetusEyeL : closeFoetusEyeR)
      }, 4242)
    }
  }
}

const closeFoetusEyeTick = foe => {
  const nextCloseEyeFrame = g.foetus[foe].eye - 1
  if (g.qss.foetus[foe].eye[nextCloseEyeFrame]) {
    if (g.qss.foetus[foe].eye[g.foetus[foe].eye]) g.qss.foetus[foe].eye[g.foetus[foe].eye](0)
    g.qss.foetus[foe].eye[nextCloseEyeFrame](1)
    g.foetus[foe].eye = nextCloseEyeFrame
  } else {
    gsap.ticker.remove(foe === 'L' ? closeFoetusEyeL : closeFoetusEyeR)
  }
}

const openFoetusEyeL = () => {
  gsap.ticker.remove(closeFoetusEyeL)
  openFoetusEyeTick('L')
}

const openFoetusEyeR = () => {
  gsap.ticker.remove(closeFoetusEyeR)
  openFoetusEyeTick('R')
}

const closeFoetusEyeL = () => {
  gsap.ticker.remove(openFoetusEyeL)
  closeFoetusEyeTick('L')
}

const closeFoetusEyeR = () => {
  gsap.ticker.remove(openFoetusEyeR)
  closeFoetusEyeTick('R')
}

const openFoetusEye = foe => {
  gsap.ticker.add(foe === 'L' ? openFoetusEyeL : openFoetusEyeR)
}

const closeFoetusEye = foe => {
  gsap.ticker.add(foe === 'L' ? closeFoetusEyeL : closeFoetusEyeR)
}

const wakeFoetuses = () => {
  g.foetus.forCleanUp.forEach(clup => {
    ifFunctionThenCall(clup)
  })
  openFoetusEye('L')
  openFoetusEye('R')
  g.scene.forCleanUp[12].annoyedFoetusL = setAddOn('#wombL', 'click', () => annoyFoetus('L'))
  g.scene.forCleanUp[12].annoyedFoetusR = setAddOn('#wombR', 'click', () => annoyFoetus('R'))
  // g.scene.forCleanUp[12].annoyedFoetusL = setAddOn('#wombL', 'click', () => activateSubScene('scene12', 'future', 'annoyFoetus'))
}

const annoyFoetusTick = foe => {
  let nextCryFrame = g.foetus[foe].cry + 1
  if (nextCryFrame < 3 && g.qss.foetus[foe].cry.start[nextCryFrame]) {
    if (g.qss.foetus[foe].cry.start[g.foetus[foe].cry]) g.qss.foetus[foe].cry.start[g.foetus[foe].cry](0)
    g.qss.foetus[foe].cry.start[nextCryFrame](1)
    g.foetus[foe].cry++
  } else {
    if (nextCryFrame === 3) g.qss.foetus[foe].cry.start[2](0)
    else g.qss.foetus[foe].cry.loop[g.foetus[foe].cry / 10](0)
    nextCryFrame = randOnum(0, 4)
    g.qss.foetus[foe].cry.loop[nextCryFrame](1)
    g.foetus[foe].cry = nextCryFrame * 10
  }
}

const annoyFoetusR = () => {
  annoyFoetusTick('R')
  echoCry('R')
}

const annoyFoetus = foe => {
  gsap.ticker.add(foe === 'L' ? annoyFoetusL : annoyFoetusR)
}

export {
  closeFoetusEye, openFoetusEye, setFoetuses, wakeFoetuses,
}
