import { gsap, TimelineMax as TL } from 'gsap'

import assFluxDisplay0 from 'url:/src/img/flux/flux-display-0.png'
import assFluxDisplay1 from 'url:/src/img/flux/flux-display-1.png'
import assFluxDisplay2 from 'url:/src/img/flux/flux-display-2.png'
import assFluxDisplay3 from 'url:/src/img/flux/flux-display-3.png'
import assFluxDisplay4 from 'url:/src/img/flux/flux-display-4.png'
import assFluxDisplay5 from 'url:/src/img/flux/flux-display-5.png'
import assFluxDisplay6 from 'url:/src/img/flux/flux-display-6.png'
import assFluxDisplay7 from 'url:/src/img/flux/flux-display-7.png'
import assFluxDisplay8 from 'url:/src/img/flux/flux-display-8.png'
import assFluxDisplay9 from 'url:/src/img/flux/flux-display-9.png'
import g from './glob'
import {
  gsapTick, ifFunctionThenCall, randOnum, setAddOn,
} from './utils'
import { closeFoetusEye } from './foetuses'
import { owlCawTick } from './owl-ram'
import { setScene } from './scene'

const setFlux = () => {
  g.flux = {
    forCleanUp: {
      C: setAddOn('#theOwl', 'click', () => echoCry('C')),
    },
    mask: 1,
  }
  g.qss.flux = {
    capacitor: gsap.quickSetter('#fluxCapacitorOn', 'css'),
    mask: [ gsap.quickSetter('#fluxMask', 'css'), gsap.quickSetter('#fluxUnMask', 'css') ],
  }

  gsap.set('#fluxMask', { scale: 0, translateY: -45 })
  gsap.set('#fluxUnMask', { scale: 100, translateY: 45 })

  setFluxDisplay()
  setFluxEchoes()
  setFluxMeter()

  g.el.flux.classList.remove('tuct')
}

const setFluxDisplay = () => {
  const assFluxDisplayDigits = [
    assFluxDisplay0,
    assFluxDisplay1,
    assFluxDisplay2,
    assFluxDisplay3,
    assFluxDisplay4,
    assFluxDisplay5,
    assFluxDisplay6,
    assFluxDisplay7,
    assFluxDisplay8,
    assFluxDisplay9,
  ]
  g.flux.display = [ {
    dispose: false,
    // eslint-disable-next-line array-bracket-newline, array-element-newline
    pre: [ 0, 0, 1, 1, 2, 4 ],
    current: 8, // how many other random digits should flash before fluxDisplay is ready for click
  },
  {
    dispose: false,
    // eslint-disable-next-line array-bracket-newline, array-element-newline
    pre: [ 4, 8, 5, 6, 3, 2 ],
    current: 12, // how many other random digits should flash before fluxDisplay is ready for click
  } ]
  g.qss.flux.display = [ [], [] ]
  assFluxDisplayDigits.forEach(afdd => {
    const fdd10 = g.document.createElement('img')
    fdd10.src = afdd
    fdd10.classList.add('fluxDisplayDigit')
    g.el.fluxDisplay10.appendChild(fdd10)
    g.qss.flux.display[0].push(gsap.quickSetter(fdd10, 'opacity'))
    const fdd01 = fdd10.cloneNode(true)
    g.el.fluxDisplay01.appendChild(fdd01)
    g.qss.flux.display[1].push(gsap.quickSetter(fdd01, 'opacity'))
  })
  g.qss.flux.directive = gsap.quickSetter('#fluxDisplayDirective', 'opacity')
  g.flux.directive = 30 // how many times the fluxDirective light flickers before settling ON
}

const setFluxEchoes = () => {
  g.flux.echo = {
    C: false,
    L: false,
    R: false,
  }
  const echosPerAxis = 8
  for (let fle = 0; fle < echosPerAxis * 2; fle++) {
    const fluxEchoLR = g.document.createElement('div')
    fluxEchoLR.classList.add('fluxEcho', 'fluxEchoLR', `fluxEcho${fle < echosPerAxis ? 'L' : 'R'}`)
    g.el[`fluxEchoAxis${fle < echosPerAxis ? 'L' : 'R'}`].appendChild(fluxEchoLR)
    if (fle < echosPerAxis) {
      const fluxEchoC = g.document.createElement('div')
      fluxEchoC.classList.add('fluxEcho', 'fluxEchoC')
      g.el.fluxEchoAxisC.appendChild(fluxEchoC)
    }
  }
  // gsap.set('.fluxEchoAxis', { opacity: 0 })
  gsap.set('.fluxEcho', {
    scale: 0.42,
    opacity: 0,
    translateY: 156,
  })
  gsap.set('.fluxEchoL', {
    translateX: -169,
  })
  gsap.set('.fluxEchoR', {
    translateX: 169,
  })
  gsap.set('.fluxEchoC', {
    translateY: -108,
  })
}

const setFluxMeter = () => {
  g.qss.flux.meter = gsap.quickSetter('#fluxMeterNeedle', 'css')
}

const echoCry = axis => {
  ifFunctionThenCall(g.flux.forCleanUp[axis])
  if (axis === 'C') g.flux.forCleanUp[axis] = gsapTick(owlCawTick)
  else closeFoetusEye(axis)
  g.el.folkloreFinalForm.classList.add('faded')
  gsap.to(g.el.folkloreFinalForm, {
    duration: 1.5,
    opacity: 0.12,
  })
  gsap.set(`#fluxEchoAxis${axis}`, {
    opacity: 1,
  })
  gsap.to(`.fluxEcho${axis}:first-child`, {
    duration: 3,
    ease: 'power2.in',
    opacity: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
  })
  gsap.to(`.fluxEcho${axis}:not(:first-child)`, {
    delay: 0.5,
    duration: 3,
    ease: 'power2.in',
    opacity: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
    stagger: {
      each: 0.5,
      repeat: -1,
    },
  })
  g.flux.echo[axis] = true
  let testAxes = true
  Object.keys(g.flux.echo).forEach(ax => {
    if (!g.flux.echo[ax]) testAxes = false
  })
  if (testAxes) {
    setTimeout(() => {
      gsap.to('#fluxFlash', {
        duration: 0.24,
        opacity: 1,
        scale: 1.24,
        repeat: 1,
        yoyo: true,
      })
      gsap.ticker.add(unMaskFlux)
    }, 4242)
  }
}

const unMaskFlux = () => {
  if (g.flux.mask <= 100) {
    g.qss.flux.mask[0]({
      // opacity: g.flux.mask / 100,
      scale: g.flux.mask / 100,
      borderRadius: `${(100 - g.flux.mask) / 2}%`,
      translateY: '+=0.9',
    })
    g.qss.flux.mask[1]({
      scale: 100 / g.flux.mask,
      translateY: '-=0.9',
    })
    g.flux.mask += 2
  } else {
    gsap.ticker.remove(unMaskFlux)
    g.qss.flux.mask[0]({
      opacity: 1,
      scale: 1,
      borderRadius: 0,
      translateY: '+=0.45',
    })
    g.qss.flux.mask[1]({
      scale: 1,
      translateY: '-=0.45',
    })
    gsap.to('#fluxEchoes', {
      duration: 3,
      onComplete: function () {
        gsap.set('.fluxEcho', {
          scale: 1,
          onComplete: function () {
            g.flux.forCleanUp.button = setAddOn('#fluxButton', 'click', eOnFlux)
            if (g.scene.skip.ff) g.el.fluxButton.click()
          },
          opacity: 0,
          overwrite: 'auto',
        })
      },
      opacity: 0,
    })
  }
}

const eOnFlux = () => {
  g.flux.forCleanUp.button()
  g.el.flux.classList.add('fluxOn')
  gsap.to('#fluxCapacitorOn', {
    duration: 0.5,
    opacity: 0.12,
  })
  bootUpFluxDisplay()
  lightFluxMeter('SUX')
}

const bootUpFluxDisplay = () => {
  gsap.set(g.el.fluxDisplay, { cursor: 'wait' })
  flickOnFluxDisplayDirective()
  gsap.ticker.add(preRandomizeFluxDisplayTick10)
  gsap.ticker.add(preRandomizeFluxDisplayTick01)
}

const lightFluxMeter = ux => {
  gsap.to(`#fluxMeterLight${ux}`, {
    duration: 0.75,
    opacity: 1,
    overwrite: true,
    repeat: -1,
    yoyo: true,
  })
}

const flickOnFluxDisplayDirective = () => {
  gsap.ticker.add(flickTick)
}

const flickTick = () => {
  if (g.flux.directive) {
    g.qss.flux.directive(randOnum())
    g.flux.directive--
  } else {
    gsap.ticker.remove(flickTick)
    g.qss.flux.directive(1)
    if (g.scene.skip.ff) g.el.fluxDisplay.click()
  }
}

const preRandomizeFluxDisplayTick10 = () => {
  preRandomizeFluxDisplayTick(0)
}
const preRandomizeFluxDisplayTick01 = () => {
  preRandomizeFluxDisplayTick(1)
}
const preRandomizeFluxDisplayTick = d => {
  if (g.qss.flux.display[d][g.flux.display[d].dispose]) {
    g.qss.flux.display[d][g.flux.display[d].dispose](0)
    g.flux.display[d].dispose = false
  }
  if (g.flux.display[d].pre.length) {
    const nextNotSoRandomNumber = g.flux.display[d].pre.shift()
    g.qss.flux.display[d][nextNotSoRandomNumber](randOnum(12, 69) / 100)
    g.flux.display[d].dispose = nextNotSoRandomNumber
  } else {
    gsap.ticker.remove(d ? preRandomizeFluxDisplayTick01 : preRandomizeFluxDisplayTick10)
    gsap.ticker.add(d ? randomizeFluxDisplayTick01 : randomizeFluxDisplayTick10)
  }
}

const randomizeFluxDisplayTick10 = () => {
  randomizeFluxDisplayTick(0)
}
const randomizeFluxDisplayTick01 = () => {
  randomizeFluxDisplayTick(1)
}
const randomizeFluxDisplayTick = d => {
  if (g.qss.flux.display[d][g.flux.display[d].dispose]) {
    g.qss.flux.display[d][g.flux.display[d].dispose](0)
    g.flux.display[d].dispose = false
  }
  if (g.flux.display[d].current > 0) {
    const nextNumberFrame = randOnum(1, 9)
    g.qss.flux.display[d][nextNumberFrame](randOnum(12, 69) / 100)
    g.flux.display[d].dispose = nextNumberFrame
    g.flux.display[d].current--
  } else {
    randomizeTargetReached(d)
  }
}

const randomizeTargetReached = d => {
  if (d && gsap.ticker._listeners.includes(randomizeFluxDisplayTick01)) {
    gsap.ticker.remove(randomizeFluxDisplayTick01)
  } else if (gsap.ticker._listeners.includes(randomizeFluxDisplayTick10)) {
    gsap.ticker.remove(randomizeFluxDisplayTick10)
  }
  g.qss.flux.display[d][0](1)
  g.flux.display[d].current = 0
  if (!g.flux.display[d ? 0 : 1].current) {
    g.flux.forCleanUp.display = [ setAddOn('#fluxDisplay', 'click', activateFluxDisplay), setAddOn('#fluxDisplay', 'mousedown', activateFluxDisplay), setAddOn('#fluxDisplay', 'mouseup', activateFluxDisplay) ]
    gsap.set(g.el.fluxDisplay, { cursor: 'pointer' })
  }
}

const activateFluxDisplay = e => {
  if (e.type === 'mousedown' || (e.type === 'click' && g.scene.skip.ff)) {
    if (!gsap.ticker._listeners.includes(incrementFluxDisplay)) gsap.ticker.add(incrementFluxDisplay)
  } else {
    gsap.ticker.remove(incrementFluxDisplay)
    gsap.ticker.add(decrementFluxDisplay)
  }
}

const getCurrentSpeed = () => Number(`${g.flux.display[0].current}${g.flux.display[1].current}`)

const dimFluxMeter = () => {
  gsap.to('#fluxMeterLightSUX', {
    duration: 0.25,
    opacity: 0,
    overwrite: true,
  })
}

const incrementFluxDisplay = () => {
  const currentSpeed = getCurrentSpeed()
  if (currentSpeed > 0) {
    dimFluxMeter()
  }
  if (currentSpeed < 88) {
    if (g.qss.flux.display[1][g.flux.display[1].dispose]) {
      g.qss.flux.display[1][g.flux.display[1].dispose](0)
      g.flux.display[1].dispose = false
    }
    g.flux.display[1].dispose = g.flux.display[1].current // for next time
    if (g.flux.display[1].current < 9) {
      g.flux.display[1].current++
    } else {
      g.flux.display[1].current = 0
      if (g.qss.flux.display[0][g.flux.display[0].dispose]) {
        g.qss.flux.display[0][g.flux.display[0].dispose](0)
        g.flux.display[0].dispose = false
      }
      g.flux.display[0].current++
      g.qss.flux.display[0][g.flux.display[0].current](1)
      g.flux.display[0].dispose = g.flux.display[0].current // for next time
    }
    g.qss.flux.display[1][g.flux.display[1].current](1)
    g.qss.flux.capacitor({
      opacity: '+=0.01',
    })
    g.qss.flux.meter({
      rotateZ: '+=1',
    })
  } else {
    g.flux.forCleanUp.display.forEach(flfc => {
      ifFunctionThenCall(flfc)
    })
    dimFluxMeter()
    lightFluxMeter('FLUX')
    gsap.ticker.remove(incrementFluxDisplay)
    gsap.set('#fluxDisplay', { cursor: 'no-drop' })
    g.qss.flux.directive(0)
    gsap.to('.fluxDisplayNumber', {
      duration: 0.42,
      opacity: 0,
      repeat: -1,
      yoyo: true,
    })
    setScene(13)
  }
}

const decrementFluxDisplay = () => {
  const currentSpeed = getCurrentSpeed()
  if (currentSpeed >= 0 && currentSpeed < 88) {
    if (g.qss.flux.display[1][g.flux.display[1].dispose]) {
      g.qss.flux.display[1][g.flux.display[1].dispose](0)
      g.flux.display[1].dispose = false
    }
    g.flux.display[1].dispose = g.flux.display[1].current // for next time
    if (!g.flux.display[1].current && g.flux.display[0].current) {
      g.flux.display[1].current = 9
      if (g.qss.flux.display[0][g.flux.display[0].dispose]) {
        g.qss.flux.display[0][g.flux.display[0].dispose](0)
        g.flux.display[0].dispose = false
      }
      g.flux.display[0].current--
      g.qss.flux.display[0][g.flux.display[0].current](1)
      g.flux.display[0].dispose = g.flux.display[0].current // for next time
    } else {
      g.flux.display[1].current--
    }
    if (g.flux.display[1].current >= 0) {
      g.qss.flux.display[1][g.flux.display[1].current](1)
      g.qss.flux.capacitor({
        opacity: '-=0.01',
      })
      g.qss.flux.meter({
        rotateZ: '-=1',
      })
    } else {
      g.flux.display[1].current = 0
      g.flux.display[1].dispose = false
      g.qss.flux.display[0][0](1)
      g.flux.display[0].dispose = 0
      gsap.ticker.remove(decrementFluxDisplay)
      lightFluxMeter('SUX')
    }
  }
}

export { echoCry, eOnFlux, setFlux }
