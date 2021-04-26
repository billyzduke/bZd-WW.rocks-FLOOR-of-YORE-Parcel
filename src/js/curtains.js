import { gsap } from 'gsap'

import g from './glob'

const setCurtains = () => {
  if (g.el.cw && g.el.cw.length) {
    const crtnsScale = (1063 * 0.8648) / g.w.h
    g.el.cw.forEach(cw => {
      cw.style.transform = `scale(${crtnsScale})`
    })
  }
}

const blurCrtnsTick = () => {
  const fromC = Math.sqrt(((g.m.x - g.crtns.cx) ** 2) + ((g.m.y - g.crtns.cy) ** 2))
  const blurPx = (fromC / 3) // - 11.5
  const crtnBlur = blurPx <= 0 ? 'none' : `blur(${blurPx}px)`
  const o = (200 - fromC) / 200
  gsap.to('#cc1', {
    id: 'blur',
    duration: g.scene.skip.dur || 1,
    opacity: gsap.utils.clamp(0, 1, o) * 0.76,
    WebkitFilter: crtnBlur,
    filter: crtnBlur,
    overwrite: 'auto',
  })
}

const unBlurCrtns = blurCrtnsTickFunc => {
  gsap.ticker.remove(blurCrtnsTickFunc)
}

const blurCrtns = () => {
  gsap.ticker.add(blurCrtnsTick)
  return () => unBlurCrtns(blurCrtnsTick)
}

export { blurCrtns, setCurtains, unBlurCrtns }
