import { gsap } from 'gsap'

import g from './glob'
import { setBaublesInLayer } from './baubles'

const setBaubleLayer01 = () => {
  g.bL[1] = setBaublesInLayer(1, 33, {}, true)
  g.bL[1].cR = 69
  g.bL[1].ctrRing = g.el.ctrRing
  g.bL[1].ctrRingLightning = []
  g.bL[1].zQuickOnSetters = []
  const tgBgAsses = Array.from({ length: 9 }, (_, i) => `src/img/lightningBalls/lightning-ball-0${i + 1}.png`)
  tgBgAsses.forEach((tgBgAss, i) => {
    g.bL[1].ctrRingLightning[i] = g.document.createElement('img')
    g.bL[1].ctrRingLightning[i].src = tgBgAss
    g.bL[1].ctrRingLightning[i].id = `z${i}`
    g.bL[1].ctrRingLightning[i].height = g.bL[1].cR * 2
    g.bL[1].ctrRingLightning[i].width = g.bL[1].ctrRingLightning[i].height
    g.bL[1].ctrRingLightning[i].classList.add('z')
    tgBgAsses.forEach((_, z) => {
      if (z !== i) g.bL[1].ctrRingLightning[i].classList.add(`z${z}`)
    })
    g.bL[1].ctrRing.appendChild(g.bL[1].ctrRingLightning[i])
    g.bL[1].zQuickOnSetters[i] = gsap.quickSetter(`#${g.bL[1].ctrRingLightning[i].id}`, 'css')
  })
  g.bL[1].zQuickOffSetter = gsap.quickSetter('.z', 'opacity')
  g.bL[1].st = (2 * Math.PI) / g.bL[1].b.length
  // console.log(g.bL)
}

const evadeMouseTick = re => {
  let inC = false
  let fromC = 0
  let o = (g.w.cx > g.cyOff) ? g.w.cx * 2 : g.cyOff * 2
  if (g.m.x && g.m.y) {
    inC = ((g.m.x - g.w.cx) ** 2) + ((g.m.y - g.cyOff) ** 2) <= ((g.bL[1].cR * 2) ** 2) / 4
    if (inC) o = (re) ? g.bL[1].cR : 0
    else {
      fromC = Math.sqrt(((g.m.x - g.w.cx) ** 2) + ((g.m.y - g.cyOff) ** 2))
      o = Math.sqrt(g.bL[1].cR * fromC) + (fromC / 2)
    }
  }
  const blur = fromC ? `blur(${(fromC / 100)}px)` : false
  g.bL[1].b.forEach((b, i) => {
    let x = g.w.cx - g.bRadii
    let y = g.cyOff - g.bRadii
    if (!inC && g.m.x && g.m.y) {
      const a = i * g.bL[1].st
      x = Math.round(g.w.cx + o * Math.cos(a) + g.w.cx - g.m.x - g.bRadii)
      y = Math.round(g.cyOff + o * Math.sin(a) + g.cyOff - g.m.y - g.bRadii)
    }
    gsap.to(b, {
      duration: g.scene.skip.dur || 0.42,
      filter: blur || 'none',
      overwrite: true,
      translateX: x,
      translateY: y,
      WebkitFilter: blur || 'none',
    })
  })
  g.bL[1].zQuickOffSetter(0)
  if (inC) {
    g.bL[1].zQuickOnSetters[gsap.utils.snap(1, gsap.utils.random(0, g.bL[1].ctrRingLightning.length - 1))]({
      opacity: gsap.utils.random(0, 1) * 0.64,
      rotateZ: gsap.utils.random(0, 360),
    })
  }
}

const unEvadeMouse = blurCrtnsTickFunc => {
  gsap.ticker.remove(blurCrtnsTickFunc)
}

const evadeMouse = () => {
  gsap.ticker.add(evadeMouseTick)
  console.log(gsap.ticker)
  return () => unEvadeMouse(evadeMouseTick)
}

export { evadeMouse, setBaubleLayer01, unEvadeMouse }
