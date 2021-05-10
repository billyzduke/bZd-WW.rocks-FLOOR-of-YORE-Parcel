import { gsap, TimelineMax as TL } from 'gsap'

import assFoetusEye00 from 'url:/src/img/foetuses/foetusEye-00.png'
import assFoetusEye01 from 'url:/src/img/foetuses/foetusEye-01.png'
import assFoetusEye02 from 'url:/src/img/foetuses/foetusEye-02.png'
import assFoetusEye03 from 'url:/src/img/foetuses/foetusEye-03.png'
import assFoetusEye04 from 'url:/src/img/foetuses/foetusEye-04.png'
import g from './glob'

const setFoetuses = () => {
  const assFoetusEyeFrames = [
    assFoetusEye00,
    assFoetusEye01,
    assFoetusEye02,
    assFoetusEye03,
    assFoetusEye04,
  ]
  const foetuses = [ 'L', 'R' ]
  g.tL.tearsOfBlood = {}

  foetuses.forEach(foe => {
    g.foetus[foe] = {
      drop: false,
      eye: 0,
      splash: 0,
    }
    g.tL.tearsOfBlood[foe] = new TL({ defaults: { overwrite: 'auto' } })
    if (g.el[`foetusEye${foe}`]) {
      g.qss.bloodSplashes[foe] = []
      g.qss.foetusEyes[foe] = []
      for (let fE = 0; fE <= 4; fE++) {
        const fEyeFrame = g.document.createElement('img')
        fEyeFrame.src = assFoetusEyeFrames[fE]
        fEyeFrame.classList.add('foetusEyeFrame', `fEye${foe}`)
        g.el[`foetusEye${foe}`].appendChild(fEyeFrame)
        g.qss.foetusEyes[foe].push(gsap.quickSetter(fEyeFrame, 'opacity'))
      }
    }
  })
}

const openFoetusEyeTick = foe => {
  const nextOpenEyeFrame = g.foetus[foe].eye + 1
  if (g.qss.foetusEyes[foe][nextOpenEyeFrame]) {
    if (g.qss.foetusEyes[foe][g.foetus[foe].eye]) g.qss.foetusEyes[foe][g.foetus[foe].eye](0)
    g.qss.foetusEyes[foe][nextOpenEyeFrame](1)
    g.foetus[foe].eye = nextOpenEyeFrame
  } else {
    gsap.ticker.remove(foe === 'L' ? openFoetusEyeL : openFoetusEyeR)
    setTimeout(() => {
      gsap.ticker.add(foe === 'L' ? closeFoetusEyeL : closeFoetusEyeR)
    }, 4242)
  }
}

const closeFoetusEyeTick = foe => {
  const nextCloseEyeFrame = g.foetus[foe].eye - 1
  if (g.qss.foetusEyes[foe][nextCloseEyeFrame]) {
    if (g.qss.foetusEyes[foe][g.foetus[foe].eye]) g.qss.foetusEyes[foe][g.foetus[foe].eye](0)
    g.qss.foetusEyes[foe][nextCloseEyeFrame](1)
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

export { closeFoetusEye, openFoetusEye, setFoetuses }
