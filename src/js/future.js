/* eslint-disable no-underscore-dangle */
import { gsap } from 'gsap'

import assFluxDisplay0 from 'url:/src/img/future/flux-display-0.png'
import assFluxDisplay1 from 'url:/src/img/future/flux-display-1.png'
import assFluxDisplay2 from 'url:/src/img/future/flux-display-2.png'
import assFluxDisplay3 from 'url:/src/img/future/flux-display-3.png'
import assFluxDisplay4 from 'url:/src/img/future/flux-display-4.png'
import assFluxDisplay5 from 'url:/src/img/future/flux-display-5.png'
import assFluxDisplay6 from 'url:/src/img/future/flux-display-6.png'
import assFluxDisplay7 from 'url:/src/img/future/flux-display-7.png'
import assFluxDisplay8 from 'url:/src/img/future/flux-display-8.png'
import assFluxDisplay9 from 'url:/src/img/future/flux-display-9.png'
import g from './glob'
import { randOnum, setAddOn } from './utils'

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

const setFluxDisplay = () => {
  g.flux.display = [ {
    dispose: false,
    track: 24,
  },
  {
    dispose: false,
    track: 32,
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
  g.flux.directive = 24
}

const setFluxEchoes = () => {
  for (let fle = 0; fle < 10; fle++) {
    const fluxEchoLR = g.document.createElement('div')
    fluxEchoLR.classList.add('fluxEcho', 'fluxEchoLR', `fluxEcho${fle < 5 ? 'L' : 'R'}`)
    g.el[`fluxEchoes${fle < 5 ? 'L' : 'R'}`].appendChild(fluxEchoLR)
    if (fle < 5) {
      const fluxEchoC = g.document.createElement('div')
      fluxEchoC.classList.add('fluxEcho', 'fluxEchoC')
      g.el.fluxEchoesC.appendChild(fluxEchoC)
    }
  }
}

const getCurrentSpeed = () => Number(`${g.flux.display[0].track}${g.flux.display[1].track}`)

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
    g.flux.display[1].dispose = g.flux.display[1].track // for next time
    if (g.flux.display[1].track < 9) {
      g.flux.display[1].track++
    } else {
      g.flux.display[1].track = 0
      if (g.qss.flux.display[0][g.flux.display[0].dispose]) {
        g.qss.flux.display[0][g.flux.display[0].dispose](0)
        g.flux.display[0].dispose = false
      }
      g.flux.display[0].track++
      g.qss.flux.display[0][g.flux.display[0].track](1)
      g.flux.display[0].dispose = g.flux.display[0].track // for next time
    }
    g.qss.flux.display[1][g.flux.display[1].track](1)
    g.qss.flux.capacitor({
      opacity: '+=0.01',
    })
    g.qss.flux.meter({
      rotateZ: '+=1',
    })
  } else {
    dimFluxMeter()
    lightFluxMeter('FLUX')
    gsap.ticker.remove(incrementFluxDisplay)
  }
}
const decrementFluxDisplay = () => {
  const currentSpeed = getCurrentSpeed()
  if (currentSpeed >= 0 && currentSpeed < 88) {
    if (g.qss.flux.display[1][g.flux.display[1].dispose]) {
      g.qss.flux.display[1][g.flux.display[1].dispose](0)
      g.flux.display[1].dispose = false
    }
    g.flux.display[1].dispose = g.flux.display[1].track // for next time
    if (!g.flux.display[1].track && g.flux.display[0].track) {
      g.flux.display[1].track = 9
      if (g.qss.flux.display[0][g.flux.display[0].dispose]) {
        g.qss.flux.display[0][g.flux.display[0].dispose](0)
        g.flux.display[0].dispose = false
      }
      g.flux.display[0].track--
      g.qss.flux.display[0][g.flux.display[0].track](1)
      g.flux.display[0].dispose = g.flux.display[0].track // for next time
    } else {
      g.flux.display[1].track--
    }
    if (g.flux.display[1].track >= 0) {
      g.qss.flux.display[1][g.flux.display[1].track](1)
      g.qss.flux.capacitor({
        opacity: '-=0.01',
      })
      g.qss.flux.meter({
        rotateZ: '-=1',
      })
    } else {
      g.flux.display[1].track = 0
      g.flux.display[1].dispose = false
      g.qss.flux.display[0][0](1)
      g.flux.display[0].dispose = 0
      gsap.ticker.remove(decrementFluxDisplay)
      lightFluxMeter('SUX')
    }
  }
}
const activateFluxDisplay = e => {
  if (e.type === 'mousedown') {
    if (!gsap.ticker._listeners.includes(incrementFluxDisplay)) gsap.ticker.add(incrementFluxDisplay)
  } else {
    gsap.ticker.remove(incrementFluxDisplay)
    gsap.ticker.add(decrementFluxDisplay)
  }
}

const randomizeTargetReached = d => {
  if (d && gsap.ticker._listeners.includes(randomizeFluxDisplayTick01)) {
    gsap.ticker.remove(randomizeFluxDisplayTick01)
  } else if (gsap.ticker._listeners.includes(randomizeFluxDisplayTick10)) {
    gsap.ticker.remove(randomizeFluxDisplayTick10)
  }
  g.qss.flux.display[d][0](1)
  g.flux.display[0].track = g.flux.display[1].track = 0
  g.scene.forCleanUp[12].fluxDisplayHold = setAddOn('#fluxDisplay', 'mousedown', activateFluxDisplay)
  g.scene.forCleanUp[12].fluxDisplayHold = setAddOn('#fluxDisplay', 'mouseup', activateFluxDisplay)
  gsap.set('#fluxDisplay', { cursor: 'pointer' })
}

const randomizeFluxDisplayTick = d => {
  if (g.qss.flux.display[d][g.flux.display[d].dispose]) {
    g.qss.flux.display[d][g.flux.display[d].dispose](0)
    g.flux.display[d].dispose = false
  }
  if (g.flux.display[d].track > 0) {
    const nextNumberFrame = randOnum(0, 9)
    g.qss.flux.display[d][nextNumberFrame](1)
    g.flux.display[d].dispose = nextNumberFrame
    g.flux.display[d].track--
  } else {
    randomizeTargetReached(d)
  }
}

const randomizeFluxDisplayTick10 = () => {
  randomizeFluxDisplayTick(0)
}
const randomizeFluxDisplayTick01 = () => {
  randomizeFluxDisplayTick(1)
}

const flickTick = () => {
  if (g.flux.directive) {
    g.qss.flux.directive(randOnum())
    g.flux.directive--
  } else {
    gsap.ticker.remove(flickTick)
    g.qss.flux.directive(1)
  }
}

const flickOnFluxDisplayDirective = () => {
  gsap.ticker.add(flickTick)
}

const randomizeFluxDisplay = () => {
  gsap.set('#fluxDisplay', {
    cursor: 'wait',
  })
  flickOnFluxDisplayDirective()
  gsap.ticker.add(randomizeFluxDisplayTick10)
  gsap.ticker.add(randomizeFluxDisplayTick01)
}

const setFluxMeter = () => {
  g.qss.flux.meter = gsap.quickSetter('#fluxMeterNeedle', 'css')
}

const setFlux = () => {
  g.flux = {}
  g.qss.flux = {
    capacitor: gsap.quickSetter('#fluxCapacitorOn', 'css'),
  }
  setFluxDisplay()
  setFluxEchoes()
  setFluxMeter()
}

const setFuture = () => {
  setFlux()
}

const dimFluxMeter = () => {
  gsap.to('#fluxMeterLightSUX', {
    duration: 0.25,
    opacity: 0,
    overwrite: true,
  })
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

const eOnFlux = () => {
  g.scene.forCleanUp[12].fluxResetButton()
  g.el.flux.classList.add('fluxOn')
  gsap.to('#fluxCapacitorOn', {
    duration: 0.5,
    opacity: 0.12,
  })
  randomizeFluxDisplay()
  lightFluxMeter('SUX')
}

export { eOnFlux, setFuture }
