import { gsap } from 'gsap'

import assLightning01 from 'url:/src/img/lightningBalls/lightning-ball-01.png'
import assLightning02 from 'url:/src/img/lightningBalls/lightning-ball-02.png'
import assLightning03 from 'url:/src/img/lightningBalls/lightning-ball-03.png'
import assLightning04 from 'url:/src/img/lightningBalls/lightning-ball-04.png'
import assLightning05 from 'url:/src/img/lightningBalls/lightning-ball-05.png'
import assLightning06 from 'url:/src/img/lightningBalls/lightning-ball-06.png'
import assLightning07 from 'url:/src/img/lightningBalls/lightning-ball-07.png'
import assLightning08 from 'url:/src/img/lightningBalls/lightning-ball-08.png'
import assLightning09 from 'url:/src/img/lightningBalls/lightning-ball-09.png'
import { setBaublesInLayer } from '.'
import g from '../glob'

const assLightning = [
  assLightning01,
  assLightning02,
  assLightning03,
  assLightning04,
  assLightning05,
  assLightning06,
  assLightning07,
  assLightning08,
  assLightning09,
]

const setBaubleLayer01 = () => {
  g.bL[1] = setBaublesInLayer(1, 33)
  if (g.bL[1]) {
    g.bL[1].cR = 69
    g.bL[1].cR02 = g.bL[1].cR * 0.2 // flingRingTick
    g.bL[1].oR = g.bL[1].cR * 7.5 // spin/orbitRingTicks
    g.bL[1].ctrRing = g.el.ctrRing
    g.bL[1].ctrRingLightning = []
    g.bL[1].zQuickOnSetters = []
    assLightning.forEach((assLight, i) => {
      g.bL[1].ctrRingLightning[i] = g.document.createElement('img')
      g.bL[1].ctrRingLightning[i].src = assLight
      g.bL[1].ctrRingLightning[i].id = `z${i}`
      g.bL[1].ctrRingLightning[i].height = g.bL[1].cR * 2
      g.bL[1].ctrRingLightning[i].width = g.bL[1].ctrRingLightning[i].height
      g.bL[1].ctrRingLightning[i].classList.add('z')
      assLightning.forEach((_, z) => {
        if (z !== i) g.bL[1].ctrRingLightning[i].classList.add(`z${z}`)
      })
      g.bL[1].ctrRing.appendChild(g.bL[1].ctrRingLightning[i])
      g.bL[1].zQuickOnSetters[i] = gsap.quickSetter(`#${g.bL[1].ctrRingLightning[i].id}`, 'css')
    })
    g.bL[1].zQuickOffSetter = gsap.quickSetter('.z', 'opacity')
    g.bL[1].st = (2 * Math.PI) / g.bL[1].b.length
    // console.log(g.bL)
  }
}

const resetCtrRing = (dur = 0.25) => {
  if (g.bL[1] && g.bL[1].b && g.bL[1].b.length) {
    g.bL[1].b.forEach((b, i) => {
      const a = i * g.bL[1].st
      const x = Math.round(g.main.cx + g.bL[1].cR * Math.cos(a) - g.b.r)
      const y = Math.round(g.main.cyOff + g.bL[1].cR * Math.sin(a) - g.b.d)
      const reset = {
        ease: 'power2',
        filter: 'none',
        x,
        y,
        overwrite: true,
        scale: 1,
        WebkitFilter: 'none',
      }
      if (g.scene.skip.ff) {
        gsap.set(b, reset)
      } else {
        reset.duration = dur
        gsap.to(b, reset)
      }
      g.bL[1].bD[i] = i
    })
  }
}

const resetCtrRingV2 = () => {
  resetCtrRing(1.5)
}

const setCtrRing = () => {
  if (g.bL[1] && g.bL[1].b && g.bL[1].b.length) {
    const r = g.main.h > g.main.w ? g.main.h : g.main.w
    g.bL[1].b.forEach((b, i) => {
      const a = i * g.bL[1].st
      const x = Math.round(g.main.cx + r * Math.cos(a) - g.b.r)
      const y = Math.round(g.main.cyOff + r * Math.sin(a) - g.b.d)
      gsap.to(b, {
        duration: 2.5,
        ease: 'power2',
        filter: 'blur(12px)',
        x,
        y,
        WebkitFilter: 'blur(12px)',
      })
    })
  }
}

const evadeMouseTick = re => {
  if (!g.scene.skip.ff && g.m.x && g.m.y) {
    let inC = false
    let fromC = 0
    let o = (g.w.cx > g.w.cyOff) ? g.w.cx * 2 : g.w.cyOff * 2
    inC = ((g.m.x - g.w.cx) ** 2) + ((g.m.y - g.w.cyOff) ** 2) <= ((g.bL[1].cR * 2) ** 2) / 4
    if (inC) o = (re) ? g.bL[1].cR : 0
    else {
      fromC = Math.sqrt(((g.m.x - g.w.cx) ** 2) + ((g.m.y - g.w.cyOff) ** 2))
      o = Math.sqrt(g.bL[1].cR * fromC) + (fromC / 2)
    }
    const blur = fromC ? `blur(${(fromC / 100)}px)` : false
    g.bL[1].b.forEach((b, i) => {
      let x = g.w.cx - g.b.r
      let y = g.w.cyOff - g.b.r
      if (!inC && g.m.x && g.m.y) {
        const a = i * g.bL[1].st
        x = Math.round(g.w.cx + o * Math.cos(a) + g.w.cx - g.m.x - g.b.r)
        y = Math.round(g.w.cyOff + o * Math.sin(a) + g.w.cyOff - g.m.y - g.b.r)
      }
      gsap.to(b, {
        duration: 0.42,
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
}

const shockTick = () => {
  let oo = 0
  let fromCC = 0
  if (g.m.x && g.m.y) {
    fromCC = Math.sqrt(((g.m.x - g.w.cx) ** 2) + ((g.m.y - g.w.cyOff) ** 2))
    oo = (g.w.cx - fromCC) / g.w.cx
  }
  const assLightOn = gsap.utils.snap(1, gsap.utils.random(0, assLightning.length - 1))
  g.bL[1].zQuickOffSetter(0)
  g.bL[1].zQuickOnSetters[assLightOn]({
    opacity: gsap.utils.random(0, oo) * 0.64,
    rotateZ: gsap.utils.random(0, 360),
  })
}

const flingRingTick = () => {
  if (!g.scene.skip.ff) {
    g.bL[1].b.forEach((b, i) => {
      const a = i * g.bL[1].st
      const tau = ((i + 2) * g.bL[1].bD[i]) / (Math.PI * 2)
      const tau2 = ((i + 3) * g.bL[1].bD[i]) / Math.PI
      const x1 = Math.sin(tau) * g.bL[1].cR + Math.round((g.w.cx + (g.bL[1].cR * Math.cos(a)) - g.b.r))
      const y1 = Math.cos(tau) * g.bL[1].cR + Math.round((g.w.cyOff + (g.bL[1].cR * Math.sin(a)) - g.b.r))
      const x2 = x1 + Math.sin(tau2) * g.bL[1].cR02
      const y2 = y1 + Math.cos(tau2) * g.bL[1].cR02
      const fromC = Math.sqrt(((x2 - g.w.cx) ** 2) + ((y2 - g.w.cyOff) ** 2))
      gsap.to(b, {
        delay: `0.${a}`,
        duration: 0.25,
        translateX: x2,
        translateY: y2,
        scale: (fromC / 100) + 0.5,
        overwrite: true,
      })
      g.bL[1].bD[i] += 0.01
    })
  }
}

const orbitRingTick = (orR, sp = 0.1, ang = 1, sc = 0) => {
  g.bL[1].b.forEach((b, i) => {
    const a = g.bL[1].bD[i] * g.bL[1].st
    const x = Math.round(g.w.cx + orR * Math.cos(a) - g.b.r)
    const y = Math.round(g.w.cyOff + ang * orR * Math.sin(a) - g.b.d)
    const scaleY = sc ? (y - (g.w.cyOff / 2)) / 100 : 1
    if (g.bL[1].bD[i] === i || orR === g.bL[1].oR) {
      gsap.to(b, {
        // delay: `0.${a}`,
        duration: sp,
        scale: scaleY,
        translateX: x,
        translateY: y,
        overwrite: true,
      })
    } else {
      g.bL[1].bQuickMoveSetters[i]({
        transform: `translate(${x}px, ${y}px) scale(${scaleY})`,
      })
    }
    g.bL[1].bD[i] -= sp
  })
}
const spinRing = () => {
  orbitRingTick(g.bL[1].cR)
}
const orbitRing = () => {
  orbitRingTick(g.bL[1].oR, 0.25, 0.25, true)
}

export {
  evadeMouseTick,
  flingRingTick,
  orbitRing,
  resetCtrRing,
  resetCtrRingV2,
  setBaubleLayer01,
  setCtrRing,
  shockTick,
  spinRing,
}
