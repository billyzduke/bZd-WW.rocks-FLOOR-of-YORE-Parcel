import { gsap, TimelineMax as TL } from 'gsap'

import assBloodSplash01 from 'url:/src/img/tearsOFBlood/bloodSplash-01.png'
import assBloodSplash02 from 'url:/src/img/tearsOFBlood/bloodSplash-02.png'
import assBloodSplash03 from 'url:/src/img/tearsOFBlood/bloodSplash-03.png'
import assBloodSplash04 from 'url:/src/img/tearsOFBlood/bloodSplash-04.png'
import assBloodSplash05 from 'url:/src/img/tearsOFBlood/bloodSplash-05.png'
import assBloodSplash06 from 'url:/src/img/tearsOFBlood/bloodSplash-06.png'
import assBloodSplash07 from 'url:/src/img/tearsOFBlood/bloodSplash-07.png'
import assBloodSplash08 from 'url:/src/img/tearsOFBlood/bloodSplash-08.png'
import assBloodSplash09 from 'url:/src/img/tearsOFBlood/bloodSplash-09.png'
import assBloodSplash10 from 'url:/src/img/tearsOFBlood/bloodSplash-10.png'
import assBloodSplash11 from 'url:/src/img/tearsOFBlood/bloodSplash-11.png'
import assBloodSplash12 from 'url:/src/img/tearsOFBlood/bloodSplash-12.png'
import assBloodSplash13 from 'url:/src/img/tearsOFBlood/bloodSplash-13.png'
import assBloodSplash14 from 'url:/src/img/tearsOFBlood/bloodSplash-14.png'
import assBloodSplash15 from 'url:/src/img/tearsOFBlood/bloodSplash-15.png'
import assBloodSplash16 from 'url:/src/img/tearsOFBlood/bloodSplash-16.png'
import assBloodSplash17 from 'url:/src/img/tearsOFBlood/bloodSplash-17.png'
import assBloodSplash18 from 'url:/src/img/tearsOFBlood/bloodSplash-18.png'
import assBloodSplash19 from 'url:/src/img/tearsOFBlood/bloodSplash-19.png'
import assBloodSplash20 from 'url:/src/img/tearsOFBlood/bloodSplash-20.png'
import assBloodSplash21 from 'url:/src/img/tearsOFBlood/bloodSplash-21.png'
import assBloodSplash22 from 'url:/src/img/tearsOFBlood/bloodSplash-22.png'
import assBloodSplash23 from 'url:/src/img/tearsOFBlood/bloodSplash-23.png'
import assBloodSplash24 from 'url:/src/img/tearsOFBlood/bloodSplash-24.png'
import assBloodSplash25 from 'url:/src/img/tearsOFBlood/bloodSplash-25.png'
import assBloodSplash26 from 'url:/src/img/tearsOFBlood/bloodSplash-26.png'
import assBloodSplash27 from 'url:/src/img/tearsOFBlood/bloodSplash-27.png'
import assBloodSplash28 from 'url:/src/img/tearsOFBlood/bloodSplash-28.png'
import assBloodSplash29 from 'url:/src/img/tearsOFBlood/bloodSplash-29.png'
import assBloodSplash30 from 'url:/src/img/tearsOFBlood/bloodSplash-30.png'
import assBloodSplash31 from 'url:/src/img/tearsOFBlood/bloodSplash-31.png'
import assBloodSplash32 from 'url:/src/img/tearsOFBlood/bloodSplash-32.png'
import assBloodSplash33 from 'url:/src/img/tearsOFBlood/bloodSplash-33.png'
import assBloodSplash34 from 'url:/src/img/tearsOFBlood/bloodSplash-34.png'
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
import assFoetusEyeSquinch01 from 'url:/src/img/foetuses/foetusEyeSquinch-01.png'
import assFoetusEyeSquinch02 from 'url:/src/img/foetuses/foetusEyeSquinch-02.png'
import assFoetusEyeSquinch03 from 'url:/src/img/foetuses/foetusEyeSquinch-03.png'
import assFoetusEyeSquinch04 from 'url:/src/img/foetuses/foetusEyeSquinch-04.png'
import g from './glob'
import {
  ifFunctionThenCall, randOnum, setAddOn,
} from './utils'
import { echoCry } from './flux'

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

  const assFoetusEyeSquinchFrames = [
    assFoetusEyeSquinch01,
    assFoetusEyeSquinch02,
    assFoetusEyeSquinch03,
    assFoetusEyeSquinch04,
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
      squinch: 0,
      slow: 3,
    }
    g.qss.foetus[foe] = {
      cry: {
        loop: [],
        start: [],
      },
      eye: [],
      squinch: [],
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
        if (assFoetusEyeSquinchFrames[fE]) {
          const fEyeSquinchFrame = g.document.createElement('img')
          fEyeSquinchFrame.src = assFoetusEyeSquinchFrames[fE]
          fEyeSquinchFrame.classList.add('foetusEyeSquinchFrame', `fSquinch${foe}`)
          g.el[`foetusEye${foe}`].appendChild(fEyeSquinchFrame)
          g.qss.foetus[foe].squinch.push(gsap.quickSetter(fEyeSquinchFrame, 'opacity'))
        }
      }
    }
  })
  setBloodSplashes()
}

const setBloodSplashes = () => {
  const assBloodSplashFrames = [
    assBloodSplash01,
    assBloodSplash02,
    assBloodSplash03,
    assBloodSplash04,
    assBloodSplash05,
    assBloodSplash06,
    assBloodSplash07,
    assBloodSplash08,
    assBloodSplash09,
    assBloodSplash10,
    assBloodSplash11,
    assBloodSplash12,
    assBloodSplash13,
    assBloodSplash14,
    assBloodSplash15,
    assBloodSplash16,
    assBloodSplash17,
    assBloodSplash18,
    assBloodSplash19,
    assBloodSplash20,
    assBloodSplash21,
    assBloodSplash22,
    assBloodSplash23,
    assBloodSplash24,
    assBloodSplash25,
    assBloodSplash26,
    assBloodSplash27,
    assBloodSplash28,
    assBloodSplash29,
    assBloodSplash30,
    assBloodSplash31,
    assBloodSplash32,
    assBloodSplash33,
    assBloodSplash34,
  ]

  Object.keys(g.foetus).forEach(foe => {
    if (g.el[`bloodSplash${foe}`]) {
      g.qss.bloodSplashes[foe] = []
      for (let bSpl = 0; bSpl < 34; bSpl++) {
        const bloodSplashFrame = g.document.createElement('img')
        bloodSplashFrame.src = assBloodSplashFrames[bSpl]
        bloodSplashFrame.classList.add('bloodSplashFrame', `bSplash${foe}`)
        g.el[`bloodSplash${foe}`].appendChild(bloodSplashFrame)
        g.qss.bloodSplashes[foe].push(gsap.quickSetter(bloodSplashFrame, 'opacity'))
      }
    }
  })
}

const bloodSplashL = () => {
  bloodSplashTick('L')
}
const bloodSplashR = () => {
  bloodSplashTick('R')
}
const bloodSplashTick = side => {
  const prevSplashFrame = g.foetus[side].splash - 1
  if (g.qss.bloodSplashes[side][prevSplashFrame]) g.qss.bloodSplashes[side][prevSplashFrame](0)
  if (g.qss.bloodSplashes[side][g.foetus[side].splash]) {
    g.qss.bloodSplashes[side][g.foetus[side].splash](1)
    g.foetus[side].splash++
  } else {
    g.foetus.unTick()
  }
}

const openFoetusEye = foe => {
  gsap.ticker.add(foe === 'L' ? openFoetusEyeL : openFoetusEyeR)
}
const openFoetusEyeL = () => {
  gsap.ticker.remove(closeFoetusEyeL)
  openFoetusEyeTick('L')
}
const openFoetusEyeR = () => {
  gsap.ticker.remove(closeFoetusEyeR)
  openFoetusEyeTick('R')
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

const closeFoetusEye = foe => {
  gsap.ticker.add(foe === 'L' ? closeFoetusEyeL : closeFoetusEyeR)
}
const closeFoetusEyeL = () => {
  gsap.ticker.remove(openFoetusEyeL)
  closeFoetusEyeTick('L')
}
const closeFoetusEyeR = () => {
  gsap.ticker.remove(openFoetusEyeR)
  closeFoetusEyeTick('R')
}
const closeFoetusEyeTick = foe => {
  const nextCloseEyeFrame = g.foetus[foe].eye - 1
  if (g.qss.foetus[foe].eye[nextCloseEyeFrame]) {
    if (g.qss.foetus[foe].eye[g.foetus[foe].eye]) g.qss.foetus[foe].eye[g.foetus[foe].eye](0)
    g.qss.foetus[foe].eye[nextCloseEyeFrame](1)
    g.foetus[foe].eye = nextCloseEyeFrame
  } else {
    gsap.ticker.remove(foe === 'L' ? closeFoetusEyeL : closeFoetusEyeR)
    if (g.scene.current === 12) {
      g.qss.foetus[foe].eye[g.foetus[foe].eye](0)
      squinchFoetusEye(foe)
    }
  }
}

const wakeFoetuses = () => {
  g.foetus.forCleanUp.forEach(clup => {
    ifFunctionThenCall(clup)
  })
  openFoetusEye('L')
  openFoetusEye('R')
  g.flux.forCleanUp.L = setAddOn('#wombL', 'click', () => annoyFoetus('L'))
  g.flux.forCleanUp.R = setAddOn('#wombR', 'click', () => annoyFoetus('R'))
}

const annoyFoetus = foe => {
  echoCry(foe)
  gsap.ticker.add(foe === 'L' ? annoyFoetusL : annoyFoetusR)
}
const annoyFoetusL = () => {
  annoyFoetusTick('L')
}
const annoyFoetusR = () => {
  annoyFoetusTick('R')
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

const squinchFoetusEye = foe => {
  gsap.ticker.add(foe === 'L' ? squinchFoetusEyeL : squinchFoetusEyeR)
}
const squinchFoetusEyeL = () => {
  squinchFoetusEyeTick('L')
}
const squinchFoetusEyeR = () => {
  squinchFoetusEyeTick('R')
}
const squinchFoetusEyeTick = foe => {
  if (g.foetus[foe].slow === 3) {
    let nextSquinchEyeFrame = g.foetus[foe].squinch + 1
    if (!g.qss.foetus[foe].squinch[nextSquinchEyeFrame]) nextSquinchEyeFrame = 1
    if (g.qss.foetus[foe].squinch[g.foetus[foe].squinch]) g.qss.foetus[foe].squinch[g.foetus[foe].squinch](0)
    g.qss.foetus[foe].squinch[nextSquinchEyeFrame](1)
    g.foetus[foe].squinch = nextSquinchEyeFrame
    g.foetus[foe].slow = 1
  } else g.foetus[foe].slow++
}

export {
  bloodSplashL, bloodSplashR, closeFoetusEye, openFoetusEye, setFoetuses, wakeFoetuses,
}
