import { gsap } from 'gsap'

import g from './glob'

const embiggenCrtnMaskTick = () => {
  g.crtns.crtnMaskQuickSetter({
    WebkitMaskSize: `${g.crtns.crtnMaskSizeObj.value}px ${g.crtns.crtnMaskSizeObj.value}px`,
    maskSize: `${g.crtns.crtnMaskSizeObj.value}px ${g.crtns.crtnMaskSizeObj.value}px`,
  })
}

const setCurtains = () => {
  if (g.el.cw && g.el.cw.length) {
    const crtnsScale = (0.91 * g.main.h) / 1063
    g.el.cw.forEach(cw => {
      cw.style.transform = `scale(${crtnsScale})`
    })
  }
}

const blurCrtnsTick = () => {
  const fromC = Math.sqrt(((g.m.x - g.w.cx) ** 2) + ((g.m.y - g.w.cy) ** 2))
  const blurPx = (fromC / 3) // - 11.5
  const crtnBlur = blurPx <= 0 ? 'none' : `blur(${blurPx}px)`
  const o = (200 - fromC) / 200
  gsap.to('#cc1', {
    id: 'blur',
    duration: g.scene.skip.ff || gsap.utils.clamp(0.25, 3, fromC / 100),
    opacity: gsap.utils.clamp(0, 1, o) * 0.76,
    WebkitFilter: crtnBlur,
    filter: crtnBlur,
    overwrite: 'auto',
  })
}

export {
  blurCrtnsTick, embiggenCrtnMaskTick, setCurtains,
}
