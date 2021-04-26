import { gsap } from 'gsap'

const setCurtains = (w, el) => {
  if (el.cw && el.cw.length) {
    const crtnsScale = (1063 * 0.8648) / w.h
    el.cw.forEach(cw => {
      // eslint-disable-next-line no-param-reassign
      cw.style.transform = `scale(${crtnsScale})`
    })
  }
}

const blurCrtnsTick = (m, crtns, skipDur) => {
  const fromC = Math.sqrt(((m.x - crtns.cx) ** 2) + ((m.y - crtns.cy) ** 2))
  const blurPx = (fromC / 3) // - 11.5
  const crtnBlur = blurPx <= 0 ? 'none' : `blur(${blurPx}px)`
  const o = (200 - fromC) / 200
  gsap.to('#cc1', {
    id: 'blur',
    duration: skipDur || 1,
    opacity: gsap.utils.clamp(0, 1, o) * 0.76,
    WebkitFilter: crtnBlur,
    filter: crtnBlur,
    overwrite: 'auto',
  })
}

const blurCrtns = (m, crtns, skipDur) => {
  const blurCrtnsTickFunc = () => blurCrtnsTick(m, crtns, skipDur)
  gsap.ticker.add(blurCrtnsTickFunc)
  return blurCrtnsTickFunc
}

const unBlurCrtns = blurCrtnsTickFunc => {
  gsap.ticker.remove(blurCrtnsTickFunc)
}

export { blurCrtns, setCurtains, unBlurCrtns }
