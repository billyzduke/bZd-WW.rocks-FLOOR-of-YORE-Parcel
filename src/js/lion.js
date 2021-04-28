import { gsap } from 'gsap'

import g from './glob'
import { randOnum } from './utils'

const setLion = () => {
  if (g.el.lolf01 && g.el.lolf02) {
    let ww
    if (g.w.w >= 1220) {
      ww = g.w.h
      g.window.scrollTo(0, 0)
    } else {
      ww = g.w.w
    }
    gsap.set([ g.el.lolf01, g.el.lolf02 ], {
      scale: (ww / Number(g.window.getComputedStyle(g.el.lolf01, null).getPropertyValue('width').slice(0, -2))) * 0.9,
    })
    if (g.scene.current < 8 && g.el.theLion) {
      gsap.set(g.el.theLion, {
        rotation: -2880,
        scale: 0,
        transformOrigin: '325px 714px',
      })
    }
    g.lion.eyes.followMouseQuickSetter = gsap.quickSetter('.lionEye', 'css')
    g.lion.eyes.active = false
  }
}

const shockTheLion = () => {
  g.lion.blur2X = gsap.quickSetter('#lionBlur2', 'css')
}

const lionShockTick = () => {
  g.lion.blur2X({
    left: `${randOnum() ? '' : '-'}${randOnum(12, 20)}px`,
    opacity: randOnum(42, 76) / 100,
  })
  gsap.set('.lightningRod', {
    opacity: 0,
  })
  Object.keys(g.qss.lightningRods).forEach(lrw => g.qss.lightningRods[lrw][gsap.utils.snap(1, gsap.utils.random(0, 28))](1))
}

const relieveTheLion = () => {
  g.lion.blur2X({
    opacity: 0,
  })
  gsap.set('.lightningRod', {
    opacity: 0,
  })
}


export {
  lionShockTick, relieveTheLion, setLion, shockTheLion,
}
