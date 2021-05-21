import { gsap } from 'gsap'

import assLightningRod00 from 'url:/src/img/lightningRods/lightning-rod-00.png'
import assLightningRod01 from 'url:/src/img/lightningRods/lightning-rod-01.png'
import assLightningRod02 from 'url:/src/img/lightningRods/lightning-rod-02.png'
import assLightningRod03 from 'url:/src/img/lightningRods/lightning-rod-03.png'
import assLightningRod04 from 'url:/src/img/lightningRods/lightning-rod-04.png'
import assLightningRod05 from 'url:/src/img/lightningRods/lightning-rod-05.png'
import assLightningRod06 from 'url:/src/img/lightningRods/lightning-rod-06.png'
import assLightningRod07 from 'url:/src/img/lightningRods/lightning-rod-07.png'
import assLightningRod08 from 'url:/src/img/lightningRods/lightning-rod-08.png'
import assLightningRod09 from 'url:/src/img/lightningRods/lightning-rod-09.png'
import assLightningRod10 from 'url:/src/img/lightningRods/lightning-rod-10.png'
import assLightningRod11 from 'url:/src/img/lightningRods/lightning-rod-11.png'
import assLightningRod12 from 'url:/src/img/lightningRods/lightning-rod-12.png'
import assLightningRod13 from 'url:/src/img/lightningRods/lightning-rod-13.png'
import assLightningRod14 from 'url:/src/img/lightningRods/lightning-rod-14.png'
import assLightningRod15 from 'url:/src/img/lightningRods/lightning-rod-15.png'
import assLightningRod16 from 'url:/src/img/lightningRods/lightning-rod-16.png'
import assLightningRod17 from 'url:/src/img/lightningRods/lightning-rod-17.png'
import assLightningRod18 from 'url:/src/img/lightningRods/lightning-rod-18.png'
import assLightningRod19 from 'url:/src/img/lightningRods/lightning-rod-19.png'
import assLightningRod20 from 'url:/src/img/lightningRods/lightning-rod-20.png'
import assLightningRod21 from 'url:/src/img/lightningRods/lightning-rod-21.png'
import assLightningRod22 from 'url:/src/img/lightningRods/lightning-rod-22.png'
import assLightningRod23 from 'url:/src/img/lightningRods/lightning-rod-23.png'
import assLightningRod24 from 'url:/src/img/lightningRods/lightning-rod-24.png'
import assLightningRod25 from 'url:/src/img/lightningRods/lightning-rod-25.png'
import assLightningRod26 from 'url:/src/img/lightningRods/lightning-rod-26.png'
import assLightningRod27 from 'url:/src/img/lightningRods/lightning-rod-27.png'
import assLightningRod28 from 'url:/src/img/lightningRods/lightning-rod-28.png'

import g from './glob'
import { padStr } from './utils'

const setLightningRods = () => {
  g.qss.lightningRods = {}

  const assLightningRods = [
    assLightningRod00,
    assLightningRod01,
    assLightningRod02,
    assLightningRod03,
    assLightningRod04,
    assLightningRod05,
    assLightningRod06,
    assLightningRod07,
    assLightningRod08,
    assLightningRod09,
    assLightningRod10,
    assLightningRod11,
    assLightningRod12,
    assLightningRod13,
    assLightningRod14,
    assLightningRod15,
    assLightningRod16,
    assLightningRod17,
    assLightningRod18,
    assLightningRod19,
    assLightningRod20,
    assLightningRod21,
    assLightningRod22,
    assLightningRod23,
    assLightningRod24,
    assLightningRod25,
    assLightningRod26,
    assLightningRod27,
    assLightningRod28,
  ]

  const lightningRodWrappers = [
    'N',
    'S',
    'E',
    'W',
  ]

  lightningRodWrappers.forEach(lrw => {
    const lightningRodWrapper = g.document.createElement('div')
    lightningRodWrapper.id = `lightningRodWrapper_${lrw}`
    lightningRodWrapper.classList.add('lightningRodWrapper')
    g.qss.lightningRods[lrw] = []
    for (let lr = 0; lr < 29; lr++) {
      const plr = padStr(lr)
      const lightningRod = g.document.createElement('img')
      lightningRod.src = assLightningRods[lr]
      lightningRod.id = `lightningRod_${lrw}_${plr}`
      lightningRod.classList.add('lightningRod')
      lightningRodWrapper.appendChild(lightningRod)
      g.qss.lightningRods[lrw].push(gsap.quickSetter(lightningRod, 'opacity'))
    }
    g.el.lightningRodsWrapper.appendChild(lightningRodWrapper)
  })
}

export { setLightningRods }
