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
import g from './glob'
import { gsapTick, setAddOn, setRemoveOn } from './utils'
import { closeFoetusEye, openFoetusEye } from './foetuses'
// eslint-disable-next-line import/no-cycle
import { activateSubScene, setScene, subSceneProgress } from './scene'
import { animateBaubleLayer03or04 } from './baubles/layer-04'

const say = (who, what) => {
  who.forEach(sayWhat => {
    if (what) {
      sayWhat.classList.add('saySaySay')
    } else {
      sayWhat.classList.remove('saySaySay')
    }
  })
}

const saySinan = () => say([ g.el.saySinan ], 1)

const sayCeren = () => say([ g.el.sayCeren ], 1)

const sayNothing = () => say([ g.el.saySinan, g.el.sayCeren ], 0)

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

const bloodSplashL = () => {
  bloodSplashTick('L')
}

const bloodSplashR = () => {
  bloodSplashTick('R')
}

const bloodDrop = side => {
  if (!g.foetus[side].drop) {
    g.foetus[side].drop = true
    const whichHandEye = side === 'L' ? g.el.sayCeren : g.el.saySinan
    const tearTL = new TL({ defaults: { overwrite: 'auto' } })
    if (g.subScene.scene11[`foetus${side}`].ff) tearTL.timeScale(1 / g.subScene.scene11[`foetus${side}`].ff)
    tearTL.set(whichHandEye, {
      cursor: 'no-drop',
    }, '>')
      .set(`#womb${side}`, {
        rotateZ: side === 'L' ? 592 : -592,
      }, '>')
      .to(`#bloodDrop${side}`, {
        duration: 0.75,
        ease: 'power1.in',
        scale: 1,
      }, '>')
      .to(`#bloodDrop${side}`, {
        duration: 3,
        ease: 'power2.in',
        translateY: `+=${side === 'L' ? 444 : 446}`,
      }, '>')
      .to(`#womb${side}`, {
        duration: 3,
        ease: 'power3.in',
        translateX: side === 'L' ? 46 : 462,
        translateY: side === 'L' ? 207 : 211,
      }, '<')
      .to(`#bloodDrop${side}`, {
        duration: 2,
        ease: 'power2.in',
        scale: 6,
      }, '<1')
      .to(`#womb${side}`, {
        duration: 2,
        ease: 'power2.in',
        onComplete: () => {
          g.foetus.unTick = gsapTick(side === 'L' ? bloodSplashL : bloodSplashR)
          g.foetus.forCleanUp.push(setAddOn(`#womb${side}`, 'mouseenter', () => openFoetusEye(side), 'wait'))
          g.foetus.forCleanUp.push(setAddOn(`#womb${side}`, 'mouseleave', () => closeFoetusEye(side), 'wait'))
          if (g.foetus[side === 'L' ? 'R' : 'L'].drop && g.subScene.scene11.folklore.progress === 'complete') setScene(12)
        },
        opacity: 0.52,
        rotateZ: side === 'L' ? 232 : -240,
        scale: side === 'L' ? 0.87 : 0.85,
      }, '<')
      .to(`#bloodDrop${side}`, {
        duration: 0.15,
        onComplete: () => {
          animateBaubleLayer03or04(side, g.subScene.scene11[`foetus${side}`].ff)
          subSceneProgress('scene11', `foetus${side}`, 'complete')
        },
        opacity: 0,
        scaleY: 0.2,
        translateY: 670,
      }, '<2')
      .to(`#womb${side}`, {
        duration: 6,
        ease: 'elastic.out(1, 0.3)',
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        translateX: side === 'L' ? -10 : 503, // may need tweak
      }, '<')
  }
}

const bloodDropL = () => {
  if (!g.subScene.scene11.ss.active) {
    activateSubScene('scene11', 'foetusL', 'cryBlood')
    setRemoveOn('#sayCeren', 'click', bloodDropL)
    bloodDrop('L')
  }
}

const bloodDropR = () => {
  if (!g.subScene.scene11.ss.active) {
    activateSubScene('scene11', 'foetusR', 'cryBlood')
    setRemoveOn('#saySinan', 'click', bloodDropR)
    bloodDrop('R')
  }
}

export {
  bloodDropL, bloodDropR, sayCeren, sayNothing, saySinan, setBloodSplashes,
}

